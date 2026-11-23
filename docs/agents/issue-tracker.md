# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in `SadyrbayevAsset/ai-for-developers-project-386`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments`.
- **Make an issue a sub-issue of a parent**: `gh issue edit <parent> --add-sub-issue <child>`.
- **Blocking**: Use GitHub sub-issues or a `Blocked by: #<n>` line at the top of the issue body.
- **Comment on an issue**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close**: `gh issue comment <number> --body "..."`, then `gh issue close <number>`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue in this repo.

## When a skill says "fetch the relevant ticket"

Read it via `gh issue view <number>`.

## TODO

- Install `gh` CLI or create the triage labels manually in GitHub:
  - `needs-triage`
  - `needs-info`
  - `ready-for-agent`
  - `ready-for-human`
  - `wontfix`
