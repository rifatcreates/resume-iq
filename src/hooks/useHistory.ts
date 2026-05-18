import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type{ Analysis } from '../types'

export const useHistory = () => {
  return useQuery({
    queryKey: ['analyses'],
    queryFn: async (): Promise<Analysis[]> => {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    },
  })
}