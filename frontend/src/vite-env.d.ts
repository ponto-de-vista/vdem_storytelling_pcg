/// <reference types="vite/client" />

declare module '*.csv' {
  const content: string;
  export default content;
}
