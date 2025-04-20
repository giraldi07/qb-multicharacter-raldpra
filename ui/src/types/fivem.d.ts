// src/types/fivem.d.ts
export {};

declare global {
  function GetParentResourceName(): string;
  function RegisterNuiCallbackType(type: string): void;
  function on(event: string, callback: (data: any, cb: (data: any) => void) => void): void;
}
