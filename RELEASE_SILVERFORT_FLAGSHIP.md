# CoreCloud Silverfort Flagship — staging candidate

## Scope
- New flagship identity-security section directly following the existing homepage hero.
- RentWorks replaced by Silverfort in homepage ecosystem and partner directory, including partner expansion copy. ReWorks retained.
- Dedicated identity-security.html solution page.
- Identity Security navigation added to homepage, partners page and shared _nav partial.
- Additive namespaced stylesheet assets/css/silverfort-flagship.css; original styles.css untouched.
- New sitemap entry.

## Production protection
- CNAME renamed to CNAME.production-reference.txt so a new GitHub Pages repository cannot accidentally claim the production domain.
- Do not add the production domain to the new repo until approval and DNS cutover.
- Canonical URLs still point at production; staging is for functional validation only and must not be indexed.

## Required before production
1. Confirm Silverfort OEM branding and approved logo asset. Current candidate uses text mark deliberately.
2. Verify all links, forms and lead delivery end to end; contact link currently routes to existing contact page.
3. Verify desktop/mobile appearance with browser rendering and check the whole site for regressions.
4. Confirm GitHub Pages staging configuration and domain/rollback plan.
5. Approve exact partner and product language.

## Known limitation
This candidate has not passed browser-based hostile interrogation. Do not connect production DNS.
