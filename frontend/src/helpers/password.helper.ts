import { helpers, minLength as libMinLength } from '@vuelidate/validators'
export const userPasswordValidators = () => {
  const hasLowercase = helpers.regex(/[a-z]/)
  const hasUppercase = helpers.regex(/[A-Z]/)
  const hasNumber = helpers.regex(/[0-9]/)
  const hasSymbol = helpers.regex(/[^A-Za-z0-9]/)
  const minLength = libMinLength(8)
  return {
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol,
    minLength
  }
}
