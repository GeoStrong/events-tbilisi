import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }
    
    return data
}
