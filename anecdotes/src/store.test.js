import { describe, expect, beforeEach, vi, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import anecdoteService from './services/anecdotes'
import useAnecdoteStore from './store'
import { useAnecdotes, useAnecdotesActions } from "./store";

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        addVote: vi.fn(),
        remove: vi.fn()
    }
}))

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('tests', () => {
    it('initialize loads anecdotes from backend', async () => {
        const mockAnecdotes = [ {id: 1, content: 'test', votes: 0 } ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.initialize()
        })
        
        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })

    it('anecdotes are sorted by vote count', () =>{
        const anecdotes = [
            { id: 1, content: 'first', votes: 2 },
            { id: 2, content: 'second', votes: 7 },
            { id: 3, content: 'third', votes: 4 }
        ]

        useAnecdoteStore.setState({ anecdotes })

        const { result } = renderHook(() => useAnecdotes())
        expect(result.current.map(a => a.votes)).toEqual([7,4,2])
    })

    it('filtering anecdotes', () => {
        const anecdotes = [
            { id: 1, content: 'coding is fun', votes: 4 },
            { id: 2, content: 'filter this one out', votes: 6 },
            { id: 3, content: 'all about coding', votes: 3 }
        ]

        useAnecdoteStore.setState({ anecdotes, filter: 'coding' })
        const { result } = renderHook(() => useAnecdotes())

        expect(result.current.map(a => a.content)).toEqual(['coding is fun', 'all about coding'])
    })

    it('adding vote properly increases vote count', async () => {
        const anecdote = { id: 1, content: 'coding is fun', votes: 0 }

        useAnecdoteStore.setState({anecdotes: [anecdote]})

        const votedAnecdote = {...anecdote, votes: 1}

        anecdoteService.addVote.mockResolvedValue(votedAnecdote)

        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.addVote(anecdote)
        })

        const { result : anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toBe(1)
    })
})