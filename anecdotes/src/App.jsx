import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useAnecdotesActions } from './store'
import anecdoteService from './services/anecdotes'


const App = () => {
  const { initialize } = useAnecdotesActions()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App