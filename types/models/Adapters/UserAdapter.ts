import type { Offer, Profile, User } from '@/types'

export interface UserAdapter {
  getOfferCard(data: User.ServerModel[]): Offer.Card[]
  getUser(data: User.ServerModel): Profile.Model
}
