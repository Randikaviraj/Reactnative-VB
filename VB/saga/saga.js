import {takeLatest,put,call,delay} from 'redux-saga/effects'
//import {getcacheProfile} from './sagafunctions'
import * as FileSystem from 'expo-file-system';
function* cacheProfile(action){
    try{
        var uridata=yield call(getcafile,action.data)
        yield  delay(4000)
        yield put({type:'updateProfileUri',data:uridata})
        console.log(data)
    }catch(e){
        console.log("Error in saga cacheProfile.............."+e)
    }
}



export default function* watchSaga(){
    
    yield takeLatest('Cacheprofile',cacheProfile)
   
}


