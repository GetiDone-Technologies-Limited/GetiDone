# Workspace Rules for GetiDone

## SampleAssets as Design Source-of-Truth
The `SampleAssets/` directory contains approved reference HTML designs for GetiDone screens.

**RULE: Whenever building or updating a GetiDone screen, always check `SampleAssets/` first.**
- If a matching reference file exists, translate its layout, components, colors, and structure faithfully into the existing React/Next.js file.
- Do NOT improvise a new design from scratch when a SampleAssets reference exists.
- Replace/update the existing page file — do not create parallel or duplicate files.
- Preserve all functional logic (API hooks, state, auth) from the existing file while upgrading the UI.
- Use mock data where the backend is not yet ready, blended with real API data where available.
- Apply ALL SampleAssets files automatically whenever any of the mapped pages are being built or updated.

Current SampleAssets → Next.js page mapping:
| SampleAssets File       | Target (Next.js)                                          |
|-------------------------|-----------------------------------------------------------|
| ClientDashboard.html    | frontend/src/app/(dashboard)/client/page.tsx              |
| Messages.html           | frontend/src/app/(dashboard)/messages/page.tsx            |
| MyProjects.html         | frontend/src/app/(dashboard)/projects/page.tsx            |
| Payments.html           | frontend/src/app/(dashboard)/payments/page.tsx            |
| TeamPODs.html           | frontend/src/app/(dashboard)/team/page.tsx                |
| Settings.html           | frontend/src/app/(dashboard)/settings/page.tsx            |

## Always Check for Existing Pages Before Updating
Before writing or modifying any page or route file, always run a directory scan of the target folder.
- Use `list_dir` on the target route directory to discover all existing files (page.tsx, layout.tsx, sub-routes, dynamic routes like `[id]`).
- Never overwrite a file without first reading its current contents.
- Never create a new file if an existing one should be updated instead.
- Preserve sub-routes and sibling files (e.g. `projects/[id]/page.tsx`) that are not part of the current update scope.
- This rule applies on every update instruction, even for pages that were previously modified.

## Auto-Push to GitHub
Always push every new update automatically to GitHub at the end of a session or when a logical chunk of work is complete. You do not need to ask for permission to commit and push changes. Use descriptive commit messages.

## Enterprise-Grade Design System Standards
Design every GetiDone interface using a strict enterprise-grade design system rather than designing individual screens independently.

1. Global Layout System
- Use a consistent 12-column responsive grid.
- All spacing must follow an 8-point spacing system (4, 8, 16, 24, 32, 48, 64, 96 px).
- All cards, widgets, panels, and content blocks must align perfectly across both horizontal and vertical axes.
- Maintain consistent whitespace throughout the application.

2. Component Library
Every UI element must come from a reusable component library. Components include Buttons, Cards, Inputs, Search bars, Avatars, Badges, Tags, Progress bars, Tables, Charts, Notifications, Navigation items, Status indicators, Modals, Drawers, Tooltips, Dropdowns, Tabs.
- Never redesign an existing component differently on another page.

3. Card Rules
All cards must have: fixed height, fixed header, fixed content section, fixed metadata section, fixed footer.
- Long text must truncate with ellipsis instead of changing layout height.
- Overflowing Information (Tab-Based): For any information that cannot fit into the card comfortably, turn the card's internal layout into a tab-based interface to display the information creatively. This is a universal rule across the entire project.

4. Typography Scale
Use one typography system only (Display, H1, H2, H3, H4, Body Large, Body, Small, Caption, Label). Each style must maintain consistent size, weight, line-height, letter spacing.

5. Design Tokens
Use centralized tokens for: Colors, Shadows, Radius, Borders, Icon sizes, Typography, Spacing, Elevation, Motion.
- Never introduce arbitrary values.

6. Visual Hierarchy
Use emphasis strategically: Primary actions should stand out. Secondary actions should recede. Decorative elements should never compete with important information. Reduce unnecessary visual noise.

7. Responsive Behaviour
Every screen must be designed for Desktop, Laptop, Tablet, Mobile. Components should scale gracefully without redesigning layouts.

8. Accessibility
Maintain WCAG-compliant color contrast. Ensure minimum touch targets of 44x44 px. Support keyboard navigation and screen readers.

9. Consistency Rule
Once a component, spacing value, radius, typography style, or color is introduced, it must remain identical across the entire GetiDone ecosystem unless explicitly updated in the design system.

10. Product Quality Standard
Every screen should be visually comparable to products from Linear, Stripe Dashboard, Notion, Figma, GitHub, Vercel, and Apple—clean, spacious, highly structured, and optimized for scalability. Design for a platform expected to grow to hundreds of interconnected screens without accumulating design debt.
