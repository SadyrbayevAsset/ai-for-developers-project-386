# Glossary

Domain terms for the calendar booking service.

## Calendar owner

The single, pre-configured user who owns the calendar. They create meeting types and view upcoming bookings. There is no authentication or owner-specific account.

## Guest

A visitor who books a call without registering or signing in.

## Meeting type

A template for a call. It has a name, description, and duration. The owner creates meeting types; guests choose one before selecting a time slot.

## Slot

A calendar interval available for booking. A slot length equals the selected meeting type duration. Slots are generated within a 14-day booking window.

## Booking

A reservation of a slot by a guest. Includes the guest's name and contact information. The same time cannot be booked twice.

## Home page

The landing page at `/`. It explains the service and contains a call-to-action that leads to the booking flow.

## Booking page

The page at `/booking` where a guest selects a meeting type and a time slot. Implemented as a placeholder in the first feature step.

## Admin page

The page at `/admin` where the owner manages meeting types. Implemented as a placeholder in the first feature step.
