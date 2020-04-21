const initialState={
    fname:'',
    lname:'',
    email:'',
    password:'',
    isloaded:'',
    errormsg:'',
    blogdata:{}
}

const reducer=(state=initialState,action)=>{
    var newState={...state}
    
    if(action.type==='SaveStore'){
        
        newState.fname=action.data.fname
        newState.lname=action.data.lname
        newState.email=action.data.email

    }
    
    if(action.type==='UpdateStore'){
        
        newState.fname=action.data.fname
        newState.lname=action.data.lname
        

    }
    if(action.type==='SaveBlogData'){
        
        newState.blogdata=action.data
    }

    return newState
    
}

export default reducer;