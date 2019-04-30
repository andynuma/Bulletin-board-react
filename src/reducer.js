const reducer = (state={}, action) => {
  switch(action.type){
    case "SET_USER":
    console.log("dispatch user : ",action.payload)
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