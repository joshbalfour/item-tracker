// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
