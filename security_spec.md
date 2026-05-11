# Security Specification for Nexus Bank

## Data Invariants
1. A transaction cannot be created for an account that does not belong to the user.
2. A user cannot modify their account balance directly; balance changes must be result of system-authorized transactions (though in this client-side demo, we'll enforce that the transaction log and account balance are consistent).
3. Users can only read their own profile, accounts, and transactions.
4. Accounts must have a valid type and account number.
5. All IDs must be strictly validated.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempt to create an account with someone else's `userId`.
2. **Resource Poisoning**: Create an account with a 1MB string as the `name`.
3. **Invalid Type**: Set account type to "infinite_money".
4. **Unauthorized Read**: Attempt to get transactions of another user's account.
5. **Unauthorized Write**: Attempt to update another user's profile `displayName`.
6. **Balance Injection**: Create a transaction with a negative amount to effectively "withdraw" without verification (if amount validation is missing).
7. **System Field Injection**: Attempt to set `status` to "completed" on a transaction that should be "pending".
8. **Shadow Field**: Adding `isAdmin: true` to a user profile document.
9. **Orphaned Transaction**: Create a transaction for a non-existent account ID.
10. **Timestamp Manipulation**: Set a `timestamp` in the past or future instead of `request.time`.
11. **Account Number Injection**: Inject long junk strings as account numbers.
12. **Relationship Breach**: Create a "transfer_out" transaction where the current user is not the owner of the source account.

## The Test Runner
(A conceptual `firestore.rules.test.ts` is omitted for brevity as per the instructions to focus on the rules themselves, but the logic is applied to the rules generation).
