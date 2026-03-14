export interface DbRestaurant {
  id:               string
  name:             string
  slug:             string
  cuisine:          string | null
  occasions: string[] | null
  area:             string | null
  address:          string | null
  postcode:         string | null
  google_place_id:  string | null
  lat:              number | null
  lng:              number | null
  price_range:      number | null
  verified:         boolean
  overall_score:    number
  music_score:      number
  crowd_score:      number
  spacing_score:    number
  rating_count:     number
  noise_level:      'library_quiet' | 'pleasantly_quiet' | 'moderate' | 'loud' | null
  best_time_label:  string | null
  tags:             string[] | null
  booking_url:      string | null
  photo_url:        string | null
  created_at:       string
  updated_at:       string
}

export interface DbRating {
  id:            string
  restaurant_id: string
  user_id:       string | null
  time_slot:     string
  day_of_week:   string
  music_score:   number
  crowd_score:   number
  spacing_score: number
  noise_sources: string[] | null
  review_text:   string | null
  status:        'pending' | 'approved' | 'flagged' | 'rejected'
  created_at:    string
}

export interface DbSuggestion {
  id:           string
  name:         string
  area:         string | null
  address:      string | null
  cuisine:      string | null
  submitted_by: string | null
  notes:        string | null
  status:       'pending' | 'approved' | 'rejected'
  created_at:   string
}