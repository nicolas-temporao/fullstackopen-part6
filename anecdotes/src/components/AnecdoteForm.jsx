import { useAnecdotesActions } from "../store";
import anedoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotesActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    const newAnecdote = await anecdoteService.createNew(content)
    addAnecdote(newAnecdote)
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