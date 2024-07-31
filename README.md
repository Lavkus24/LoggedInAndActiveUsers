
## Overview

Brief description of the project.

## Logic to Calculate Monthly Logged In and Active Users

For each month in the year:

- `logged_in_users`: Count of users with:
  - `logged_in` <= end of month
  - `logged_out` >= start of month or `logged_out` is null
- `active_users`: Count of users with `lastOpenedAt` within the month
- Store results for the month

## Assumptions

- Each `deviceId` and `userId` pair represents a single login session.
- If a user has not logged out, the `logged_out` field can be null.
- There are no overlapping sessions for the same user.

## Fields

- **sessionDuration** (number)
  - **Benefit**: Allows quick calculation of user activity time without repeatedly computing from `logged_in` and `logged_out` timestamps, potentially reducing time complexity.

- **Monthly Summary**
  - **Benefit**: Speeds up the monthly active user calculation.
