---
title: "In Defense of the Boring Monolith: Service Layers in Express"
description: "Everyone tells you to reach for microservices. Here's why a well-structured Express monolith with a strict service layer was the right call for a production healthcare platform."
date: "2026-07-22"
tags: ["Node.js", "Architecture", "Express", "Engineering Leadership"]
---

There's a moment in every backend project where someone suggests microservices. For [Support24](/projects/pp-001), that moment came early — the platform had real-time scheduling, chat, incident reporting, and multi-tenant access control. Surely that's "microservices territory"?

We decided no. Then we had to make the monolith *deserve* the decision.

## What Actually Goes Wrong with Monoliths

Monoliths fail in a specific way: boundaries erode. A route handler reaches directly into the database. Business logic splits between the controller and a utility file. Six months in, nothing can be tested in isolation and every change has blast radius proportional to the codebase.

The failure isn't structural — it's *disciplinary*. So we institutionalized the discipline.

## The Rules

Three rules, enforced in code review:

1. **Route handlers only parse input and format output.** No business logic, no direct database access — handlers delegate to services.
2. **Services own business logic and persistence.** Shift validation rules, incident state transitions, permission checks — all in services with explicit dependencies.
3. **Services never import from the HTTP layer.** The dependency arrow points one way, always.

```typescript
// routes/shifts.ts — thin, boring, no surprises
router.post('/shifts', async (req, res) => {
  const result = await shiftService.assignShift(req.body, req.context);
  res.status(201).json(result);
});
```

That's it. That's the whole trick. But it changes the mathematics of the codebase: shift validation rules live in exactly one place, unit tests target services without touching HTTP, and the "complex shift validation rules remain maintainable and testable" promise from the README is actually true.

## When the Migration Path Matters

We knew real-time load might eventually force scheduling out into its own service. The service layer is what makes that a *migration* rather than a *rewrite* — the boundaries already exist; you're moving code across them, not discovering them under scaffolding.

That's the honest pitch for a structured monolith: it's not a rejection of microservices, it's a deferral of the decision until you have the traffic data to make it properly. Premature distribution buys you network latency, deployment orchestration, and consistency headaches in exchange for scalability you don't need yet.

## The Leadership Angle

As the engineer responsible for this architecture, the hardest part wasn't the design — it was holding the line in code review when deadlines pressed and "just this once" a handler wanted to query MongoDB directly. Architecture is a social contract enforced one diff at a time.

Boring is a feature. Ship the boring monolith.
