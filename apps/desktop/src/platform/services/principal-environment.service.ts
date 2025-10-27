import { AccountService } from "@bitwarden/common/auth/abstractions/account.service";
import {
  Region,
  RegionConfig,
  Urls,
} from "@bitwarden/common/platform/abstractions/environment.service";
import { DefaultEnvironmentService } from "@bitwarden/common/platform/services/default-environment.service";
import { StateProvider } from "@bitwarden/common/platform/state";

import { LOCKED_ENVIRONMENT_URLS, LOCKED_WEB_VAULT_URL } from "../../branding";

const LOCKED_REGION = Region.SelfHosted;

function cloneLockedUrls(): Urls {
  return {
    base: LOCKED_ENVIRONMENT_URLS.base,
    webVault: LOCKED_ENVIRONMENT_URLS.webVault,
    api: LOCKED_ENVIRONMENT_URLS.api,
    identity: LOCKED_ENVIRONMENT_URLS.identity,
    icons: LOCKED_ENVIRONMENT_URLS.icons,
    notifications: LOCKED_ENVIRONMENT_URLS.notifications,
    events: LOCKED_ENVIRONMENT_URLS.events,
    keyConnector: LOCKED_ENVIRONMENT_URLS.keyConnector,
    scim: LOCKED_ENVIRONMENT_URLS.scim,
  };
}

function lockedRegionConfig(): RegionConfig {
  return {
    key: LOCKED_REGION,
    domain: LOCKED_WEB_VAULT_URL.replace(/^https?:\/\//, ""),
    urls: cloneLockedUrls(),
  };
}

export class PrincipalEnvironmentService extends DefaultEnvironmentService {
  constructor(stateProvider: StateProvider, accountService: AccountService) {
    super(stateProvider, accountService);
  }

  async enforceLockedEnvironment(): Promise<void> {
    await super.setEnvironment(LOCKED_REGION, cloneLockedUrls());
  }

  override availableRegions(): RegionConfig[] {
    return [lockedRegionConfig()];
  }

  override async setEnvironment(region: Region, urls?: Urls): Promise<Urls> {
    await super.setEnvironment(LOCKED_REGION, cloneLockedUrls());
    return cloneLockedUrls();
  }
}
