/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BE_BASE_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  