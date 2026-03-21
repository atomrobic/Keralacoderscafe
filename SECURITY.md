# Security Policy

## Supported Versions

Security fixes are currently applied on a best-effort basis to the latest
version of the repository.

| Version | Supported |
| --- | --- |
| `main` / latest | Yes |
| Older snapshots | No |

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead:

1. Use GitHub's private vulnerability reporting flow if it is enabled for this
   repository.
2. If private reporting is not available, contact the repository maintainers
   privately through GitHub.
3. Include as much detail as you can: affected page or component, impact,
   reproduction steps, and any proof of concept or suggested fix.

We will review reports as quickly as possible and aim to keep communication
clear throughout triage and remediation.

## Scope

Relevant issues may include:

- Vulnerabilities in site dependencies
- Exposed secrets or unsafe configuration
- Client-side flows that unintentionally bypass restrictions
- XSS, injection, or content spoofing issues
- Supply-chain or workflow security concerns in this repository
