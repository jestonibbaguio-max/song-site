import { Injectable, computed, signal } from '@angular/core';
import {
  AccountInfo,
  AuthenticationResult,
  BrowserCacheLocation,
  Configuration,
  EventType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

const env = (import.meta as ImportMeta & { env?: ImportMetaEnv }).env;
const redirectUri = resolveRedirectUri(env);
const clientId = env?.VITE_ENTRA_CLIENT_ID ?? '8b6a9386-67b2-4d05-9966-6f20a67713f8';
const tenantId = env?.VITE_ENTRA_TENANT_ID ?? 'b647a764-1b83-4076-8305-ff4ee0fbbcdf';

const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
      loggerCallback: () => undefined,
    },
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly client = new PublicClientApplication(msalConfig);
  private readonly accountSignal = signal<AccountInfo | null>(null);
  private readonly initializedSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly busySignal = signal(false);

  readonly account = computed(() => this.accountSignal());
  readonly isAuthenticated = computed(() => this.accountSignal() !== null);
  readonly isInitialized = computed(() => this.initializedSignal());
  readonly error = computed(() => this.errorSignal());
  readonly isBusy = computed(() => this.busySignal());
  readonly displayName = computed(() => {
    const account = this.accountSignal();
    return account?.name ?? account?.username ?? 'Guest';
  });

  constructor() {
    this.client.addEventCallback((event) => {
      if (event.eventType !== EventType.LOGIN_SUCCESS) {
        return;
      }

      const result = event.payload as AuthenticationResult | null;
      if (!result?.account) {
        return;
      }

      this.client.setActiveAccount(result.account);
      this.accountSignal.set(result.account);
      this.errorSignal.set(null);
    });
  }

  async initialize(): Promise<void> {
    if (this.initializedSignal()) {
      return;
    }

    try {
      await this.client.initialize();
      const redirectResult = await this.client.handleRedirectPromise();

      if (redirectResult?.account) {
        this.client.setActiveAccount(redirectResult.account);
      }

      const activeAccount = this.client.getActiveAccount() ?? this.client.getAllAccounts()[0] ?? null;
      if (activeAccount) {
        this.client.setActiveAccount(activeAccount);
      }

      this.accountSignal.set(activeAccount);
      this.errorSignal.set(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication initialization failed.';
      this.errorSignal.set(message);
      this.accountSignal.set(this.client.getActiveAccount() ?? this.client.getAllAccounts()[0] ?? null);
    } finally {
      this.initializedSignal.set(true);
    }
  }

  async login(): Promise<void> {
    await this.initialize();
    this.busySignal.set(true);

    try {
      await this.client.loginRedirect({
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
      });
    } catch (error) {
      this.errorSignal.set(getErrorMessage(error, 'Unable to start SSO login.'));
      this.busySignal.set(false);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.initialize();

    await this.client.logoutRedirect({
      account: this.client.getActiveAccount() ?? this.accountSignal(),
      postLogoutRedirectUri: redirectUri,
    });
  }
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function isLocalhostHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function normalizeRedirectUri(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl.trim());
    const path = parsed.pathname.replace(/\/index\.html$/i, '/');
    const normalizedPath = path.endsWith('/') ? path : `${path}/`;
    return `${parsed.origin}${normalizedPath}`;
  } catch {
    return null;
  }
}

export function resolveRedirectUri(
  runtimeEnv: ImportMetaEnv,
  currentLocationHref = typeof window !== 'undefined' ? window.location.href : '',
): string {
  const configured = runtimeEnv?.VITE_AZURE_REDIRECT_URI?.trim();
  const runtimeResolved = normalizeRedirectUri(currentLocationHref);

  if (configured) {
    const configuredResolved = normalizeRedirectUri(configured);
    if (configuredResolved) {
      const configuredHost = new URL(configuredResolved).hostname;
      const runtimeHost = runtimeResolved ? new URL(runtimeResolved).hostname : null;

      // If production is running on a non-localhost host, ignore a localhost env override.
      if (isLocalhostHost(configuredHost) && runtimeHost && !isLocalhostHost(runtimeHost)) {
        return runtimeHost === null ? configuredResolved : runtimeResolved ?? configuredResolved;
      }

      return configuredResolved;
    }

    return configured;
  }

  if (runtimeResolved) {
    return runtimeResolved;
  }

  return 'http://localhost:4200/';
}