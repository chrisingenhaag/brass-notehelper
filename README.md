# NoteHelper (Notenhelferlein)

An interactive web app for brass players learning to read notes and find the matching slide or valve positions on their instrument.

Pick an instrument, step through notes on the staff with the keyboard, mouse, or touch, and see which position or valve combination produces the pitch.

## Supported instruments

| Instrument   | Clef   |
| ------------ | ------ |
| Trombone     | Bass   |
| Horn (in F)  | Bass   |
| Tuba         | Bass   |
| Trumpet in C | Treble |

Available in German (default) and English.

## Tech stack

- [SvelteKit 2](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev/)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- [svelte-i18n](https://github.com/kaisermann/svelte-i18n)
- Vitest (unit) + Playwright (e2e)
- `@sveltejs/adapter-node` for production builds

## Getting started

```bash
npm install
npm run dev          # start dev server
npm run dev -- --open
```

## Scripts

```bash
npm run build        # production build
npm run preview      # preview the production build
npm run lint         # prettier + eslint
npm run format       # auto-format with prettier
npm run check        # svelte-check type-checking
npm run test:unit    # vitest
npm run test:e2e     # playwright (expects the built app on port 4173)
npm run test         # unit + e2e
```

Run a single Vitest file:

```bash
npx vitest run src/lib/components/StaffSystem.svelte.test.ts
```

## Project layout

- [src/lib/positionBase.ts](src/lib/positionBase.ts) — core types, `Instrument` and `ScoreSystem` enums, staff/position helpers
- [src/lib/instrumentPositions.ts](src/lib/instrumentPositions.ts) — note-to-position data for each instrument
- [src/lib/components/StaffSystem.svelte](src/lib/components/StaffSystem.svelte) — SVG renderer for the staff, clef, notes, and accidentals
- [src/lib/i18n/](src/lib/i18n/) — locale setup and translations (`de.json`, `en.json`)
- [src/routes/](src/routes/) — file-based routing: home, `/instrument/[instrument]/[system]`, `/about`

See [CLAUDE.md](CLAUDE.md) for deeper architectural notes and the steps to add a new instrument.

## Deployment

A Docker image is built and published to `ghcr.io/chrisingenhaag/brass-notehelper` on every merge to `main` via GitHub Actions. [Semantic Release](https://semantic-release.gitbook.io/) drives versioning and the [CHANGELOG](CHANGELOG.md) from [Conventional Commits](https://www.conventionalcommits.org/).

The container runs the Node adapter on port 3000:

```bash
docker run --rm -p 3000:3000 ghcr.io/chrisingenhaag/brass-notehelper:latest
```

## License

[Creative Commons BY-NC-ND 4.0](LICENSE) — attribution, non-commercial, no derivatives.
