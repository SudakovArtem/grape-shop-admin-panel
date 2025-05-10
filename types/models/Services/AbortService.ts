export interface AbortService {
  getControllerSignal(): AbortSignal
  abortController(): void
  reloadController(): void
}
