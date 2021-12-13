import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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


	const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(addVote(id))
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