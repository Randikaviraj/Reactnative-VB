import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import MagazineHome from '../component/magazinehome';
import MagazineContent from '../component/magazinecontent';




const MagazineStack=createStackNavigator({
    MagazineHome:{
        screen:MagazineHome,
        navigationOptions: {
            headerShown:false
          }
    },
    MagazineContent:{
        screen:MagazineContent,
        navigationOptions: {
            headerShown:false
          }
    },
    
    
})


export default createAppContainer(MagazineStack);