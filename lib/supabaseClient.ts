import { createClient } from '@supabase/supabase-js'
// import { Database } from './types/supabase'
import { EventEntity } from './types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for common operations
export const eventQueries = {
  getEvents: async (category?: string) => {
    let query = supabase
      .from('events')
      .select(`
        *,
        event_categories(
          categories(name)
        ),
        event_tags(tag),
        event_participants(
          users(*)
        )
      `)
    
    if (category) {
      query = query.eq('event_categories.categories.name', category)
    }

    return query
  },

  createEvent: async (event: EventEntity) => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()

    return { data, error }
  }
}