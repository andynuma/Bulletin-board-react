const reducer = (state={}, action) => {
  switch(action.type){
    case "SET_USER":
    return{
      currentUser: action.payload,
      isLoading:false
    }
    case "CLEAR_USER":
      return{
        currentUser: null
      }
    default :
      return state
  }
}

export default reducer;