import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn : getAnecdotes,
        retry: false,
        refreshOnWindowFocus: false
      })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes']})
        }
    })
    const voteAnecdoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes']})
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation({ content, votes: 0 }),
        addVote: (anecdote) => voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }
}