import { useAnecdotesActions } from "../store";
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotesActions()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    const newAnecdote = await anecdoteService.createNew(content)
    addAnecdote(newAnecdote)

    setNotification(`You created '${content}'`)
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm