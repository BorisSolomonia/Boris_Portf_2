/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_BASE_URL: string
  readonly VITE_MAX_FILE_SIZE_MB: string
  readonly VITE_UPLOAD_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}