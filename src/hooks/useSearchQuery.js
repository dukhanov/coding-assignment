import {useCallback} from 'react'
import {createSearchParams, useSearchParams} from 'react-router-dom'

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const setSearchQuery = useCallback(
    (search = '') => {
      setSearchParams(createSearchParams(search !== '' ? {search} : {}))
    },
    [setSearchParams]
  )

  return [searchQuery ?? '', setSearchQuery]
}
