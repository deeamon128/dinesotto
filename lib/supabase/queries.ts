import { createServerSupabaseClient } from './server'
import { mapRestaurant } from './mappers'

export async function getRestaurants() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('overall_score', { ascending: false })

  if (error) {
    console.error('Error fetching restaurants:', error)
    return []
  }

  return data.map(mapRestaurant)
}

export async function getRestaurantBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return mapRestaurant(data)
}

export async function getRatingsByRestaurant(restaurantId: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) return []

  return data
}

export async function getHeatmapData(restaurantId: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .rpc('get_heatmap', { p_restaurant_id: restaurantId })

  if (error) {
    console.error('Heatmap error:', error)
    return []
  }

  return data as {
    time_slot:   string
    day_of_week: string
    avg_score:   number
    count:       number
  }[]
}