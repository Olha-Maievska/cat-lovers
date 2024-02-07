export const filterSearchParams = (
  searchParams: URLSearchParams,
  filterOut: string
) => {
  const searchEntries = Array.from(searchParams.entries())
  const paramsObject = searchEntries.reduce<Record<string, string>>(
    (acc, entry) => {
      if (entry[0] === filterOut) {
        return acc
      }

      acc[entry[0]] = entry[1]

      return acc
    },
    {}
  )

  return paramsObject
}
