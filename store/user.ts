import { defineStore } from 'pinia'
import { User } from '@/types'

export default defineStore('user', () => {
  const userData = ref<User.Model | null>(null)
  const user = computed<User.Model | null>(() => userData.value)

  const setUser = (data: User.Model | null) => {
    userData.value = data
  }

  const isCompany = computed<boolean>(() => {
    return user.value?.userType === User.Types.COMPANY
  })

  const isCandidate = computed<boolean>(() => {
    return user.value?.userType === User.Types.CANDIDATE
  })

  return {
    user,
    setUser,
    isCompany,
    isCandidate
  }
})
