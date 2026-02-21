import { create } from 'zustand'

interface FavoriteState {
  favorites: string[]
  isFavorite: (item: string) => boolean
  addFavorite: (item: string) => void
  removeFavorite: (item: string) => void
  toggleFavorite: (item: string) => void
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  isFavorite: (jobId: string) => {
    const { favorites } = get()
    return favorites.includes(jobId)
  },

  addFavorite: (jobId: string) =>
    set(state => ({ favorites: [...state.favorites, jobId] })),

  removeFavorite: (jobId: string) =>
    set(state => ({ favorites: state.favorites.filter(id => id !== jobId) })),

  toggleFavorite: (jobId: string) => {
    const { isFavorite, removeFavorite, addFavorite } = get()
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId)
  },
}))
