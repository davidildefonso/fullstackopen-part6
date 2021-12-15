
import anecdoteService from '../services/anecdotes'


// const updatedAnecdote = await anecdoteService.vote(anecdote.id, {...anecdote, votes: anecdote.votes + 1} )

export const addVote = ( anecdote) => { 
    return async dispatch => {
		const updatedAnecdote = await anecdoteService.vote(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
		dispatch({
			type: 'VOTE',
			data: updatedAnecdote,
		})
 	}
}

export const createAnecdote = (data) => {
   return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }

}



export const initializeAnecdotes = (anecdotes) => {
   return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }


}



const reducer = (state = [], action) => {
	switch(action.type) {
		case 'NEW_ANECDOTE':
			return state.concat(action.data)

		case 'VOTE': {
			const id = action.data.id			
			return state.map(anec =>
				anec.id !== id ? anec : action.data 
			)
		}
		case 'INIT_ANECDOTES':
      		return action.data

		default:
			return state
	}

 	
}

export default reducer