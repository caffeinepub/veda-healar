# Specification

## Summary
**Goal:** Update the booking form to submit data to the new Google Apps Script webhook URL.

**Planned changes:**
- Update the BookingForm component to POST booking data to the new Google Apps Script web app endpoint
- Ensure form submission sends all booking fields (name, email, phone, date, time, service) to the new URL
- Maintain existing success/error response handling

**User-visible outcome:** Users can submit booking requests through the form, which will now be processed by the updated Google Apps Script webhook.
