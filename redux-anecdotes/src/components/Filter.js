import React from 'react'
import {  connect } from 'react-redux'
import { filterValue } from '../reducers/filterReducer'

const Filter = (props) => {  

  const handleChange = (event) => {
    	props.filterValue(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    filterValue: value => {
      dispatch(filterValue(value))
    },
  }
}


export default connect(
  null, 
  mapDispatchToProps
)(Filter)