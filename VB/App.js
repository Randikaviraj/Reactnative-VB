import React,{useState} from 'react';
import { StyleSheet,  View, } from 'react-native';
import {Asset,AppLoading} from 'expo';
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import Navigation from './navigation/mainstack'
import reducerA from './reducers/reducerA'
//import watchSaga from './saga/saga'



//const sagaMiddleware = createSagaMiddleware()


const rootreducer=combineReducers({
  rA:reducerA,

});
const store=createStore(rootreducer);

// sagaMiddleware.run(watchSaga)


const images=[require('./assets/images/mainbackground.jpg'),
              require('./assets/images/SidebarBackground.jpg'),
              require('./assets/images/Entering_q.jpg')];

export default function App() {
  const [imgloaded,setLoaded]=useState('false');

  handleResource=async=>{
    const cachImages=images.map(img=>{
      return Asset.fromModule(img).downloadAsync();
    })
    
    return Promise.all(cachImages);
  }
  
  if(imgloaded){
    return (
      <Provider store={store}>
      <View style={styles.container}>
       <Navigation/>     
      </View>
      </Provider>
    );
  }else{
    <AppLoading
    startAsync={handleResource}
    onFinish={()=>setLoaded(true)}
    onError={err=>Console.warn(err)}
    />
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
