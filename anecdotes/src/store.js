
import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: id => set(state => ({
      anecdotes: state.anecdotes.map(anecdote=>
        id === anecdote.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    })),
    addAnecdote: anecdote=> set(
      state => ({ anecdotes: state.anecdotes.concat(anecdote)})
    ),
    setFilter: value=> set(() => ({filter: value})),
    initialize: anecdotes => set(()=>({ anecdotes }))
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state)=> state.filter)
