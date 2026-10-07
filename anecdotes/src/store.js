
import { create } from 'zustand'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  notification: null,
  actions: {
    addVote: id => set(state => ({
      anecdotes: state.anecdotes.map(anecdote=>
        id === anecdote.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    })),
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
    setNotification: message => set(() => ({ nofitication: message }))
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state)=> state.filter)
export const useNotification = () => useAnecdoteStore(state => state.notification)