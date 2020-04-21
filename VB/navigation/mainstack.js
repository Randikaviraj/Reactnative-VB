import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Main from '../component/main';
import SignUp from '../component/signup';
import Login from '../component/login';
import Home from '../component/home';
import ForgetPass from '../component/forgetpassword'


const MainStack=createStackNavigator({
    
    Main:{
        screen:Main,
        navigationOptions: {
            headerShown:false,
          }
    },
   
    Signup:{
        screen:SignUp,
        navigationOptions:{
            headerStyle:{
                backgroundColor:'#000080',
                height:80,
                
            },
            headerTintColor: '#ffffff',
            title:'SIGN UP',
            headerTitleStyle: {
                fontSize: 25,
                fontWeight:'bold'
              },
        }
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerStyle:{
                backgroundColor:'#000080',
                height:80,
                
            },
            headerTintColor: '#ffffff',
            title:'SIGN IN',
            headerTitleStyle: {
                fontSize: 25,
                fontWeight:'bold'
              },
        }
    },
    Home:{
        screen:Home,
        navigationOptions: {
            headerShown:false
          }
    },
    ForgetPass:{
        screen:ForgetPass,
        navigationOptions: {
            headerShown:false
          }
    },
     
})


export default createAppContainer(MainStack);