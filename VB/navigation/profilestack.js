import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import ProfileHome from '../component/profilehome';
import ChangePassword from '../component/changepassword';
import UpdateProfile from '../component/updateprofile';
import Logout from '../component/logout';


const ProfileStack=createStackNavigator({
    Profile:{
        screen:ProfileHome,
        navigationOptions: {
            headerShown:false
          }
    },
    ChangePassword:{
        screen:ChangePassword,
        navigationOptions: {
            headerShown:false
          }
    },
    UpdateProfile:{
        screen:UpdateProfile,
        navigationOptions: {
            headerShown:false
          }
    },
    Logout:{
        screen:Logout,
        navigationOptions: {
            headerShown:false
          }
    },
    
})


export default createAppContainer(ProfileStack);