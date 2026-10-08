import { useAnecdotes, useAnecdotesActions, useFilter } from "../store";
import anecdoteService from '../services/anecdotes'
import useNotificationStore from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { updateAnecdote, deleteAnecdote } = useAnecdotesActions()
  const setNotification = useNotificationStore(state => state.setNotification)

  const vote = async(anecdote) => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    updateAnecdote(updatedAnecdote)

    setNotification(`You voted '${anecdote.content}'`)
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleDelete = async(anecdote) => {
    await anecdoteService.remove(anecdote)
    deleteAnecdote(anecdote)

    setNotification(`Deleted '${anecdote.content}`)
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
                  {anecdote.votes === 0 && (
                    <button onClick={() => handleDelete(anecdote)}>
                      delete
                    </button>
                  )}
              </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList