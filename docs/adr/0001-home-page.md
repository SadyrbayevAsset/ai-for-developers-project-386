# ADR-0001: Home page design

## Status

Accepted

## Context

The application needs an entry point that explains the service to a guest and lets them start the booking flow. The first feature step focuses only on this page.

## Decision

- The home page is the landing page at `/`.
- It displays the service name, a short description, and a primary call-to-action button "Записаться на звонок".
- The call-to-action navigates to `/booking`, which is a placeholder until the booking feature is implemented.
- A secondary link "Управление типами встреч" points to `/admin`, also a placeholder.
- The page uses shadcn/ui components (`Button`, `Card`) and Tailwind CSS.
- Client-side routing is handled by `react-router-dom`.

## Consequences

- Clear separation between the landing entry point and the functional booking flow.
- The booking and admin pages can be implemented independently in subsequent steps.
- A small routing layer is introduced in the frontend.
