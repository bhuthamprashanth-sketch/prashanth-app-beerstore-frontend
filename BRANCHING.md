# Git Flow

## Branches
- main: production
- release: staging
- develop: integration branch for developers
- feature/*: feature work branches created from develop

## Pull Request Flow
1. Create `feature/<name>` from `develop`.
2. Open PR: `feature/<name>` -> `develop`.
3. After QA on develop, open PR: `develop` -> `release`.
4. After staging sign-off, open PR: `release` -> `main`.

## Rules
- Do not commit directly to `main`.
- Do not commit directly to `release`.
- Keep PRs small and testable.
