import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotesActions()

  const getId = () => Number((Math.random() * 1000000).toFixed(0))

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    addAnecdote({
      content,
      id: getId(),
      votes: 0
    })
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