const initialState={
    fname:'',
    lname:'',
    email:'',
    password:'',
    isloaded:'',
    errormsg:'',
    blogdata:{},
    magazineCovers:{},
    magazineCatagory:{},
    magazineArticles:{},
    profileuri:null,

}

const reducer=(state=initialState,action)=>{
    var newState={...state}
    if(action.type==='ProfilcachUri'){
        
        newState.profileuri=action.data
    }
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
    if(action.type==='MagazineCoverssave'){
        
        newState.magazineCovers=action.data
    }
    if(action.type==='ContentMagzineSave'){
        
        newState.magazineCatagory=action.data
    }
    if(action.type==='ArticleMagzineSave'){
        
        newState.magazineArticles=action.data
    }
    

    return newState
    
}

export default reducer;