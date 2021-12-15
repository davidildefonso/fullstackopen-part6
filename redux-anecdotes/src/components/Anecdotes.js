import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
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

const Anecdotes = (props) => {


  	const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)

	const vote =  (anecdote) => {		
		
		props.addVote(anecdote)

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
      {props.anecdotes.map(anecdote =>
			<Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
      )}
   </>
  )
}


const mapDispatchToProps = {
  addVote,
}

const mapStateToProps = (state) => {

	const sorted = state.anecdotes.sort((a, b) => b.votes - a.votes)	
	if(state.filter === "") return { anecdotes: sorted}

	return {
		anecdotes: sorted.filter(anecdote => new RegExp(state.filter).test(anecdote.content))
	}  
}


const ConnectedAnecdotes = connect(mapStateToProps,  mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes