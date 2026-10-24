import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'
import useNotification from './useNotification'

export const useAnecdotes = () => {
    const { notify } = useNotification()
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn : getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
      })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes']})
            notify(`You created '${newAnecdote.content}'`)
        },

        onError: () => {
            notify('Anecdote is too short (<5)')
        }
    })
    const voteAnecdoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes']})
            notify(`You voted for '${updatedAnecdote.content}'`)
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        addVote: (anecdote) => voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }
}