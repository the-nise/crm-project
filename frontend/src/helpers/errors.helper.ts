import type { ExceptionDto } from '@/client/api'

export function isErrorResponse(response: unknown): response is ExceptionDto {
  return (response as ExceptionDto).error !== undefined
}
