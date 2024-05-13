import { AxiosInstance } from '@/helpers/axios'
import {
  LeadsApiFactory,
  type Lead,
  type CreateLeadDto,
  type UpdateLeadDto,
  type ExceptionDto
} from '@/client/api'

const model = LeadsApiFactory(undefined, import.meta.env.VITE_BE_BASE_URL, AxiosInstance)

export const useLeadService = () => {
  const findAll: () => Promise<Lead[]> = async () => {
    try {
      const { data } = await model.findAllLeads()
      return data
    } catch (e: any) {
      return []
    }
  }

  const findOne: (id: string) => Promise<Lead | ExceptionDto> = async (id) => {
    try {
      const { data } = await model.findOneLead(id)
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

  const create: (lead: CreateLeadDto) => Promise<Lead | ExceptionDto> = async (lead) => {
    try {
      const { data } = await model.createLead(lead)
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

  const update: (id: string, updateLeadDto: UpdateLeadDto) => Promise<Lead | ExceptionDto> = async (
    id,
    updateLeadDto
  ) => {
    try {
      const { data } = await model.updateLead(id, updateLeadDto)
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

  return { findAll, findOne, create, update }
}
