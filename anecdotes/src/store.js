import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addAnecdote: anecdote=> set(
      state => ({ anecdotes: state.anecdotes.concat(anecdote)})
    ),
    updateAnecdote: updatedAnecdote => set(state=> ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ?
        updatedAnecdote : anecdote
      )
    })),
    setFilter: value=> set(() => ({filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    addVote: async (anecdote) => {
      const updatedAnecdote = await anecdoteService.addVote(anecdote)
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      }))
    },
    deleteAnecdote: anecdoteToDelete => set(
      state => ({anecdotes: state.anecdotes.filter(anecdote =>
        anecdote.id !== anecdoteToDelete.id
      )})
    )
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes
  .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  .toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state)=> state.filter)

export default useAnecdoteStore