import { AxiosInstance } from '@/helpers/axios'
import {
  type Campaign,
  type CreateCampaignDto,
  type UpdateCampaignDto,
  type ExceptionDto,
  CampaignsApiFactory
} from '@/client/api'

const model = CampaignsApiFactory(undefined, import.meta.env.VITE_BE_BASE_URL, AxiosInstance)

export const useCampaignService = () => {
  const findAll: () => Promise<Campaign[]> = async () => {
    const { data } = await model.findAllCampaigns()
    return data
  }

  const findOne: (id: string) => Promise<Campaign | ExceptionDto> = async (id) => {
    try {
      const { data } = await model.findOneCampaign(id)
      return data
    } catch (e: any) {
      if (e.response?.data) {
        return e.response.data
      } else {
        return {
          message: 'Something went wrong, please try again later.'
        }
      }
    }
  }

  const create: (campaign: CreateCampaignDto) => Promise<Campaign | ExceptionDto> = async (
    campaign
  ) => {
    try {
      const { data } = await model.createCampaign(campaign)
      return data
    } catch (e: any) {
      if (e.response?.data) {
        return e.response.data
      } else {
        return {
          message: 'Something went wrong, please try again later.'
        }
      }
    }
  }

  const update: (
    campaignId: string,
    updateCampaignDto: UpdateCampaignDto
  ) => Promise<Campaign | ExceptionDto> = async (campaignId, updateCampaignDto) => {
    const { data } = await model.updateCampaign(campaignId, updateCampaignDto)
    return data
  }

  const remove: (campaign: Campaign) => Promise<void | ExceptionDto> = async (campaign) => {
    await model.removeCampaign(campaign.id)
  }

  return { findAll, findOne, create, update, remove }
}
