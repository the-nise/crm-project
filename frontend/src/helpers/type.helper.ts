import type { Campaign, ExceptionDto, User } from '@/client/api'

export function isUserResponse(response: User | ExceptionDto): response is User {
  return (response as User).id !== undefined
}

export function isCampaignResponse(response: Campaign | ExceptionDto): response is Campaign {
  return (response as Campaign).id !== undefined
}
