import React from 'react'
import { connect, useDispatch, useSelector  } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
   const dispatch = useDispatch()
	const timeout = useSelector(state => state.notification.timeout)

  const addAnecdote =   (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''	
    props.createAnecdote(content)


	if(timeout){
			clearTimeout(timeout)
			dispatch(hideNotification())
	}

	dispatch(showNotification( {
		content:  "ANECDOTE CREATED!",
		timeout: setTimeout(() => {
				dispatch(hideNotification())
		}, 3000)
	} ))
	

  }

  return (
	<>
   		<h2>create new</h2>
  		<form onSubmit={addAnecdote} >
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>

	</>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
  }
}



export default connect(
  null, 
  mapDispatchToProps
)(AnecdoteForm)