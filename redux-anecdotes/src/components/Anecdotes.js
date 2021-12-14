import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
     <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
  )
}

const Anecdotes = () => {


	const anecdotes = useSelector(state => {
		const sorted = state.anecdotes.sort((a, b) => b.votes - a.votes)		
		return state.filter === "" 
			? sorted
			: sorted.filter(anecdote => new RegExp(state.filter).test(anecdote.content))
	} )
  	const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)

	const vote = (id) => {
		dispatch(addVote(id))

		if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
		}

		dispatch(showNotification( {
			content:  "VOTE SAVED!",
			timeout: setTimeout(() => {
					dispatch(hideNotification())
			}, 3000)
		} ))
		

	}   


  return(
   <>
	 <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
			<Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
      )}
   </>
  )
}

export default Anecdotes