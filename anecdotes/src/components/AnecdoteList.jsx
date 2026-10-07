import { useAnecdotes, useAnecdotesActions, useFilter } from "../store";
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { updateAnecdote, setNotification } = useAnecdotesActions()

  const vote = async(anecdote) => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    updateAnecdote(updatedAnecdote)

    setNotification(`You voted '${anecdote.content}'`)
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const visibleAnecdotes = anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .toSorted((a,b) => b.votes - a.votes)

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
              </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList