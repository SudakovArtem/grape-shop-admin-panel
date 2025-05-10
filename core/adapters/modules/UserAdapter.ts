import type { nuxtContext } from '@nuxt/types'
import { type Offer, type Profile, User, type UserAdapter as IUserAdapter } from '@/types'

export default (context: nuxtContext) => {
  const defaultSocialMedia: User.SocialMedia = {
    telegram: '',
    vk: '',
    hh: ''
  }

  class UserAdapter implements IUserAdapter {
    getOfferCard(data: User.ServerModel[]): Offer.Card[] {
      if (!data?.length) {
        return []
      }

      return data.map((item) => ({
        id: item.id,
        userType: item.userType === User.Types.CANDIDATE ? User.Types.CANDIDATE : User.Types.COMPANY,
        title: item.userType === User.Types.CANDIDATE ? item?.jobTitle ?? '' : item?.fullName ?? '',
        direction: item.direction?.value ?? '',
        status: item.status?.value ?? ''
      }))
    }

    getUser(data: User.ServerModel): Profile.Model {
      return {
        id: data.id ?? -1,
        cv: data.cvLink ?? '',
        description: data.description ?? '',
        email: data.email ?? '',
        name: data.fullName ?? '',
        jobTitle: data.jobTitle ?? '',
        phone: data.phone ?? '',
        userType: (data.userType as User.Types) ?? User.Types.CANDIDATE,
        social: data.socialMedia ?? defaultSocialMedia,
        status: data.status ?? null,
        direction: data.direction ?? null
      }
    }
  }

  context.$adapters.user = new UserAdapter()
}
