import { createServerSupabaseClient } from './server'
import { mapRestaurant } from './mappers'

interface GetRestaurantsOptions {
  orderBy?: string;
  limit?: number;
  verified?: boolean;
  minRatings?: number;
}

export async function getRestaurants(options: GetRestaurantsOptions = {}) {
  const supabase = await createServerSupabaseClient()

  const {
    orderBy = 'overall_score',
    limit,
    verified,
    minRatings,
  } = options;

  let query = supabase
    .from('restaurants')
    .select('*')
    .order(orderBy, { ascending: false })

  if (verified !== undefined) query = query.eq('verified', verified)
  if (limit !== undefined) query = query.limit(limit)
  if (minRatings !== undefined) query = query.gte('rating_count', minRatings)

  const { data, error } = await query

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

export async function getFilterOptions() {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('restaurants')
    .select('area, cuisine, occasions')

  if (!data) return { areas: [], cuisines: [], occasions: [] }

  const areas = [...new Set(data.map(r => r.area).filter(Boolean))].sort() as string[]
  const cuisines = [...new Set(data.map(r => r.cuisine).filter(Boolean))].sort() as string[]
  const occasions = [...new Set(data.flatMap(r => r.occasions ?? []).filter(Boolean))].sort() as string[]

  return { areas, cuisines, occasions }
}