export default function useCapitalizeFirstLetter() {
  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return { capitalizeFirstLetter }
}
