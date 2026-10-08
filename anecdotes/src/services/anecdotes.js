const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
    const newAnecdote = {
        content,
        votes: 0
    }

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnecdote)
    })
    return response.json()
}

const addVote = async (anecdote) => {
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
    })
    return response.json()
}

const remove = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'DELETE',
    })
    return response
}

export default { getAll, createNew, addVote, remove }