export default defineNuxtRouteMiddleware(() => {
  const { abort: abortService } = useServices()

  abortService.abortController()
  abortService.reloadController()
})
