# CoreCloud Silverfort Flagship RC3 — staging candidate

Baseline: RC2, preserved separately. Original `assets/css/styles.css` retained byte-for-byte.

## Changes
- Navigation: flagship emphasis separated from active-page state; `aria-current` corrected across pages.
- Guide modal: Escape handling, close control, scrolling and focus restoration added.
- Identity Security: expanded enterprise use cases, service accounts, Silverfort capabilities, sector relevance and proof-of-value pathway.
- Added isolated `assets/css/rc3-polish.css` for spacing, navigation, ultrawide tiles and modal usability.
- Existing homepage flagship markup retained.

## Known release gates
- This is a staging candidate, NOT production certified. Test real browser navigation and interactions, visual layouts at 390/768/1440/1920/3440 widths, lead form delivery, and external URLs.
- Official approved LSD Open, Silverfort and ReWorks logo files are not included; existing text marks remain until approved assets are supplied.
- No production CNAME included. Do not point the live domain to this repository before acceptance.
- External links cannot be conclusively verified offline. See RC3_VALIDATION.json for local reference scan.
