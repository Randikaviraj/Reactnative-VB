import {takeLatest,put,call,} from 'redux-saga/effects'
import {saveSignUpServer} from './sagafunctions'

function* signUpAsync(action){
    try{
        const data=yield call(saveSignUpServer,action.data)
        yield put({type:'AfterSignUp',data:data})
        console.log(data)
    }catch(e){
        console.log("Error in saga signUpAsync.............."+e)
    }
}



export default function* watchSaga(){
    
    yield takeLatest('Carry',signUpAsync)
   
}