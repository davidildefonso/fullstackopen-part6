import React , {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

	const dispatch = useDispatch()
	useEffect(() => {
		anecdoteService
		.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
	}, [])
 
  return (
    <div>
	 <Notification/>
	 <Filter/>
     <Anecdotes/>     
     <AnecdoteForm />
    </div>
  )
}

export default App