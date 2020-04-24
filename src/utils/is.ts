export const isNewLine = (str: string) => {
  return /(\n)|(\r\n)/.test(str)
}
