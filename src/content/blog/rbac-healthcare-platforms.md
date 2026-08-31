---
title: "Designing RBAC That Survives Contact with Healthcare Reality"
description: "How I built a role-based access system for a multi-tenant healthcare platform where getting permissions wrong wasn't an option — and the trade-offs I made along the way."
date: "2026-08-18"
tags: ["Architecture", "Security", "Node.js", "Healthcare"]
---

When I started building [Support24](/projects/pp-001), a healthcare support platform handling shift scheduling and incident reporting across multiple facilities, I knew the access control system would be the hardest part to get right. Not because RBAC is conceptually hard — it isn't — but because in healthcare, a permission mistake isn't a bug ticket. It's a compliance incident.

## The Four-Role Starting Point

The platform needed four roles: **Admin**, **Operator**, **Specialist**, and **User**. On paper, that's a simple permission matrix. The reality was messier:

- Operators in one facility shouldn't see incident reports from another facility (multi-tenancy).
- Specialists needed *narrow but deep* access — full read on incidents assigned to them, no write on shift schedules.
- Admins at the facility level were distinct from platform-level admins.

The classic mistake is treating roles as the only axis of authorization. Facility scope turned out to matter just as much. A user can be an Operator at Facility A and a plain User at Facility B — so permissions had to resolve against the *pair* of (role, tenant), never the role alone.

## Where the Logic Lives

I implemented authorization as an explicit policy layer rather than scattering checks through route handlers. Every request resolves to a permission set before the controller runs:

```typescript
// Simplified from the production system
function resolvePermissions(user, facilityId) {
  const membership = user.memberships.find((m) => m.facilityId === facilityId);
  if (!membership) return EMPTY_PERMISSIONS;

  const base = ROLE_PERMISSIONS[membership.role];
  const constraints = membership.constraints ?? {};

  // Specialists may be scoped to assigned incidents only
  if (constraints.assignedOnly) {
    return filterToAssigned(base, user.id);
  }

  return base;
}
```

The important property: **the policy layer is the only place that knows what a role means.** Route handlers ask "can this request read incident reports?" and never re-derive the answer. When the rules changed mid-project (they always do), we touched one file instead of forty.

## The Audit Trail Decision

The decision I'm most glad we made early: every permission check that *fails* gets logged with the user, facility, resource, and timestamp — and every mutation on an incident report is written to an append-only audit collection in MongoDB.

This cost us maybe two days of work up front. It paid for itself the first time a facility administrator asked "who changed this shift assignment at 3am?" — a question we could answer in one query instead of one forensic investigation.

## What I'd Do Differently

Honest retrospective: I'd introduce the (role, tenant) pairing from day one instead of bolting on facility scoping after the first multi-tenant demo. The initial single-axis model was simpler to build and painful to migrate — exactly the trade-off you'd predict.

If you're building access control for a system where the stakes are real, spend your design time on *where the rules live*, not on enumerating the rules themselves. The enumeration will change. The architecture shouldn't have to.
