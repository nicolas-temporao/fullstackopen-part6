import { create } from 'zustand'

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
    initialize: anecdotes => set(()=>({ anecdotes })),
    deleteAnecdote: anecdoteToDelete => set(
      state => ({anecdotes: state.anecdotes.filter(anecdote =>
        anecdote.id !== anecdoteToDelete.id
      )})
    )
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state)=> state.filter)