import { DbRestaurant } from './types'

const NOISE_LABEL: Record<string, string> = {
  library_quiet:    'Library Quiet',
  pleasantly_quiet: 'Pleasantly Quiet',
  moderate:         'Moderate',
  loud:             'Loud',
}

const PRICE_LABEL: Record<number, string> = {
  1: '£',
  2: '££',
  3: '£££',
  4: '££££',
}

export function mapRestaurant(r: DbRestaurant) {
  return {
    id:           r.id,
    name:         r.name,
    slug:         r.slug,
    cuisine:      r.cuisine ?? '',
    occasions: r.occasions ?? [],
    area:         r.area ?? '',
    address:      r.address ?? '',
    postcode:     r.postcode ?? '',
    lat:          r.lat ?? 0,
    lng:          r.lng ?? 0,
    price:        PRICE_LABEL[r.price_range ?? 2] ?? '££',
    verified:     r.verified,
    score: r.overall_score ?? 0,
    musicScore:   r.music_score,
    crowdScore:   r.crowd_score,
    spacingScore: r.spacing_score,
    ratings:      r.rating_count,
    noise:        NOISE_LABEL[r.noise_level ?? 'moderate'] ?? 'Moderate',
    bestTime:     r.best_time_label ?? '',
    tags:         r.tags ?? [],
    bookingUrl:   r.booking_url ?? null,
    photo:        r.photo_url ?? null,
  }
}

export type MappedRestaurant = ReturnType<typeof mapRestaurant>