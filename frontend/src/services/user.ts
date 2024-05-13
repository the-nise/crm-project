import { AxiosInstance } from '@/helpers/axios'
import {
  UsersApiFactory,
  type User,
  type CreateUserDto,
  type UpdateUserDto,
  type ExceptionDto
} from '@/client/api'

const model = UsersApiFactory(undefined, import.meta.env.VITE_BE_BASE_URL, AxiosInstance)

export const useUserService = () => {
  const findAll: () => Promise<User[]> = async () => {
    try {
      const { data } = await model.findAllUsers()
      return data
    } catch (e: any) {
      return []
    }
  }

  const findOne: (id: string) => Promise<User | ExceptionDto> = async (id) => {
    try {
      const { data } = await model.findOneUser(id)
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

  const create: (user: CreateUserDto) => Promise<User | ExceptionDto> = async (user) => {
    try {
      const { data } = await model.createUser(user)
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

  const update: (id: string, updateUserDto: UpdateUserDto) => Promise<User | ExceptionDto> = async (
    id,
    updateUserDto
  ) => {
    const { data } = await model.updateUser(id, updateUserDto)
    return data
  }

  const remove: (user: User) => Promise<void | ExceptionDto> = async (user) => {
    await model.removeUser(user.id)
  }

  return { findAll, findOne, create, update, remove }
}
