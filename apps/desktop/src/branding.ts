export const BRAND_NAME = "Principal Productions - Vault Manager";

export const LOCKED_WEB_VAULT_URL = "https://vault.principalprod.fr";

import { Urls } from "@bitwarden/common/platform/abstractions/environment.service";

export const BRAND_DOMAIN = new URL(LOCKED_WEB_VAULT_URL).host;
export const BRAND_PROTOCOL_SCHEME = "principalvaultmanager";
export const BRAND_NATIVE_MESSAGING_HOST = "fr.principalprod.vaultmanager";

export const LOCKED_ENVIRONMENT_URLS: Urls = {
  base: LOCKED_WEB_VAULT_URL,
  webVault: LOCKED_WEB_VAULT_URL,
  api: `${LOCKED_WEB_VAULT_URL}/api`,
  identity: `${LOCKED_WEB_VAULT_URL}/identity`,
  icons: `${LOCKED_WEB_VAULT_URL}/icons`,
  notifications: `${LOCKED_WEB_VAULT_URL}/notifications`,
  events: `${LOCKED_WEB_VAULT_URL}/events`,
  keyConnector: null,
  scim: null,
};

const BRAND_REPLACEMENTS: Array<[RegExp, () => string]> = [
  [/https?:\/\/vault\.bitwarden\.com/gi, () => LOCKED_WEB_VAULT_URL],
  [/https?:\/\/bitwarden\.com/gi, () => LOCKED_WEB_VAULT_URL],
  [/vault\.bitwarden\.com/gi, () => LOCKED_WEB_VAULT_URL],
  [/bitwarden\.com/gi, () => BRAND_DOMAIN],
  [/send\.bitwarden\.com\/#/gi, () => `${LOCKED_WEB_VAULT_URL}/#/send/`],
  [/send\.bitwarden\.com/gi, () => `${LOCKED_WEB_VAULT_URL}/send`],
  [/Bitwarden Send/gi, () => `${BRAND_NAME} Send`],
  [/Bitwarden Authenticator/gi, () => `${BRAND_NAME} Authenticator`],
  [/Bitwarden CLI/gi, () => `${BRAND_NAME} CLI`],
  [/Bitwarden Web Vault/gi, () => `${BRAND_NAME} Web Vault`],
  [/Bitwarden/g, () => BRAND_NAME],
  [/bitwarden/gi, () => BRAND_NAME],
];

export function applyBranding(text: string | null | undefined): string {
  if (text == null) {
    return text ?? "";
  }

  let result = text;

  for (const [pattern, replacementFactory] of BRAND_REPLACEMENTS) {
    result = result.replace(pattern, () => replacementFactory());
  }

  return result;
}
