import pkg from "@eduba/ui/package.json";

/**
 * Single source of truth for the displayed @eduba/ui version.
 *
 * Read from packages/ui/package.json at build time — the same file Changesets
 * bumps on release. Never hard-code the version in a component; import this so
 * the docs and the published package can never drift.
 */
export const UI_VERSION = pkg.version;
