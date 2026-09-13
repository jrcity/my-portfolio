---
title: "Abstracting Payment Gateways with the Strategy Pattern"
description: "A government-scale tax platform can't afford vendor lock-in. How a decoupled PaymentGatewayManager let us swap providers, add payment channels, and keep API contracts honest."
date: "2026-08-05"
tags: ["Architecture", "Laravel", "Fintech", "Design Patterns"]
---

[Cashworx](/projects/pp-002) is a tax and service payment platform built for Nigerian state government use. When we started, the payment landscape was fragmented — multiple gateway providers, each with different APIs, callback conventions, and failure modes. The architectural question that shaped the whole backend: *how do we build for providers we haven't chosen yet?*

## The Problem with `if (provider === 'x')`

The naive approach — branching on the provider name inside your payment flow — fails in specific, predictable ways:

1. **Every new provider touches every payment code path.** Onboarding a new gateway becomes a refactor instead of an addition.
2. **Test coverage decays.** Each branch combination multiplies your test matrix.
3. **Vendor quirks leak into your domain.** Your "record payment" logic shouldn't know that one provider reports status via webhook and another via polling.

## The PaymentGatewayManager

We built a strategy-based architecture around a decoupled `PaymentGatewayManager`. Each provider implements a strict interface — initialize, charge, verify, refund — and the manager resolves which strategy to use based on payment channel configuration:

```php
interface PaymentGateway
{
    public function initialize(Payment $payment): RedirectIntent;
    public function verify(Transaction $transaction): VerificationResult;
    public function refund(Transaction $transaction, Money $amount): RefundResult;
}
```

The key discipline: **the interface reflects our domain, not any provider's API.** `VerificationResult` speaks in our terms — settled, pending, failed — and each strategy translates from the provider's vocabulary. When a provider changed their webhook payload format, the diff was confined to one class.

## Contract Testing Kept It Honest

An interface is only as good as its guarantees. We wrote a shared contract test suite that every gateway strategy had to pass — same scenarios, same expected semantics. This is what made onboarding a second (then third) provider a matter of days rather than weeks: the tests told you when your translation layer was lying.

## Asynchronous Where It Counts

Tax computation is heavy, so anything that could be deferred went to a queue — receipt generation, notification broadcasting via OneSignal/FCM, reconciliation jobs. The payment *initiation* path stays synchronous because latency there is user-facing; everything downstream is eventually consistent by design.

PostgreSQL gave us the transactional integrity for financial records; Redis gave us the queue backbone. The separation between "money moved" (hard, transactional, synchronous) and "consequences of money moving" (soft, queued, retryable) is the pattern I'd carry into any fintech system.

## Takeaway

The Strategy pattern isn't exotic — it's in every design patterns book. What made it valuable here was pairing it with a domain-shaped interface and contract tests that enforced the shape. If you're about to integrate a third-party service you might outlive, spend an afternoon defining *your* vocabulary for it first. The abstraction you need will fall out of that vocabulary naturally.
