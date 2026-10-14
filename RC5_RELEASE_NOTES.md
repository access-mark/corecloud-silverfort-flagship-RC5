# CoreCloud Silverfort RC5 — staging candidate

## Changes
- Replaced competing RC2/RC3/RC4 nav overrides with one RC5 navigation style. Flagship Identity Security uses a small cyan dot, while current page has a single consistent state.
- Replaced duplicated navigation scripts with one RC5 script; preserves original mobile menu in main.js.
- Consolidated guide modal event handling, keyboard Escape and focus trapping.
- Guide form no longer contains a hard-coded production-domain success fallback; selected guide asset is same-origin.
- Changed no-CORS Apps Script response to *unverified*, rather than falsely claiming a delivered lead.
- Original assets/css/styles.css remains byte-for-byte unchanged.

## Production blockers (external dependencies)
1. FormSubmit recipient activation and an end-to-end guide/contact/NDA delivery test with actual mailbox receipt.
2. Assessment lead capture: GOOGLE_APPS_SCRIPT_URL is blank; local-only capture is not a production CRM integration.
3. Official LSD Open, Silverfort and ReWorks brand logos not supplied.
4. Live browser regression across viewport sizes, and validation of external destinations, remains to be done.

**Do not replace production until these gates pass.**
