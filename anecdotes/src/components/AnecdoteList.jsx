import { useAnecdotes, useAnecdotesActions } from "../store";
import anecdoteService from '../services/anecdotes'
import useNotificationStore from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { updateAnecdote, deleteAnecdote, addVote } = useAnecdotesActions()
  const setNotification = useNotificationStore(state => state.setNotification)

  const vote = async(anecdote) => {
    await addVote(anecdote)

    setNotification(`you voted '${anecdote.content}'`)
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleDelete = async(anecdote) => {
    await anecdoteService.remove(anecdote)
    deleteAnecdote(anecdote)

    setNotification(`Deleted '${anecdote.content}'`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
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