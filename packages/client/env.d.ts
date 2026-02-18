/// <reference types="vite/client" />

declare module 'react' {
  interface HTMLAttributes extends AriaAttributes, DOMAttributes {
    'cmdk-input-wrapper'?: string;
  }
}

export {};
