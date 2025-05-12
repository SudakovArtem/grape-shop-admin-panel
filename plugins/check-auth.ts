export default defineNuxtPlugin(async () => {
  const { user: userService } = useServices()

  await userService.checkAuth()
})
