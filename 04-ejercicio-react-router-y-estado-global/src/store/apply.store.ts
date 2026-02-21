import { create } from 'zustand'

interface ApplyState {
  applied: string[]
  isApplied: (item: string) => boolean
  addApplied: (item: string) => void
}

export const useApplyStore = create<ApplyState>((set, get) => ({
  applied: [],

  isApplied: (jobId: string) => {
    const { applied } = get()
    return applied.includes(jobId)
  },

  addApplied: (jobId: string) =>
    set(state => ({ applied: [...state.applied, jobId] })),
}))
