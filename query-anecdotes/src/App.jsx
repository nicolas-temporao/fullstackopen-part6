import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'


const App = () => {
  const { anecdotes, isPending, isError, addVote } = useAnecdotes()

  if (isError) {
    return <div>Error in anecdote service</div>
  }
  if (isPending) {
    return <div>Loading anecdotes...</div>
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App