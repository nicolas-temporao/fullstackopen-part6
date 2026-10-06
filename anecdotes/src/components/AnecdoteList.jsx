import { useAnecdotes, useAnecdotesActions, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { addVote } = useAnecdotesActions()

  const vote = (id) => {
    addVote(id)
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
                  <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList