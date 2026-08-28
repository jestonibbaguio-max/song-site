interface ImportMetaEnv {
  readonly VITE_AZURE_REDIRECT_URI?: string;
  readonly VITE_ENTRA_CLIENT_ID?: string;
  readonly VITE_ENTRA_TENANT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}