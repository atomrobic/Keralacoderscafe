# Contributing

Thanks for considering a contribution to Kerala Coders Cafe.

This repository powers the public website for the KCC community. Contributions
that improve accessibility, performance, design quality, content clarity, and
community experience are all welcome.

## Ways to Contribute

- Fix bugs or regressions
- Improve the UI, responsiveness, or accessibility
- Refine copy, documentation, or onboarding flows
- Propose or build community-focused features
- Improve repository health, tooling, or automation

## Before You Start

- Read the [README](./README.md) for project context and setup
- Check existing issues and pull requests to avoid duplicate work
- Open an issue first if your change is large, architectural, or changes
  project direction
- Keep pull requests focused and easy to review

## Local Setup

1. Fork and clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`

## Development Guidelines

- Use TypeScript and keep changes strict-type friendly
- Follow the existing App Router structure in `app/`
- Reuse existing design patterns and component conventions where possible
- Prefer small, composable changes over large rewrites
- Keep copy community-friendly and beginner-welcoming
- Test responsive behavior for any UI change

## Before Opening a Pull Request

Run the project checks locally:

```bash
npm run lint
npm run build
```

If your change affects UI, include screenshots or a short video in the pull
request so reviewers can understand the impact quickly.

## Pull Request Expectations

- Use a clear title and description
- Reference the related issue when applicable
- Explain what changed and why
- Note any follow-up work that is intentionally out of scope
- Update docs when behavior, setup, or contributor workflow changes

## Community Standards

By participating in this project, you agree to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md).
