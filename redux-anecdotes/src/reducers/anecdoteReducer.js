





export const addVote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}



export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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