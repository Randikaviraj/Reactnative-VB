import React from 'react';
import { createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import{Dimensions} from 'react-native'
import {Feather} from '@expo/vector-icons'
import Sidebar from '../screens/sidebar'
import {ArticleScreen,BlogerScreen,AboutScreen} from '../navigation/homedraw'


const DrawNavigater=createDrawerNavigator({
    ArticleScreen:{
        screen:ArticleScreen,
        navigationOptions:{
            title:'Home',
            drawerIcon:({tintColor})=><Feather size={16} color={tintColor} name='home' />
        }
    },
    BlogerScreen:{
        screen:BlogerScreen,
        navigationOptions:{
            title:'Blogger',
            drawerIcon:({tintColor})=><Feather size={16} color={tintColor} name='briefcase'  />
        }
    },
    AboutScreen:{
        screen:AboutScreen,
        navigationOptions:{
            title:'About',
            drawerIcon:({tintColor})=><Feather size={16} color={tintColor} name='book-open' />
        }
    }
},{
    contentComponent:(props)=><Sidebar {...props}/>,
    drawerWidth:Dimensions.get('window').width*0.85,

    hideStatusBar:true,
    contentOptions:{
        activeBackgroundColor:'#ffe6ff',
        activeTintColor:'#cc00cc',
        itemStyle:{
            borderRadius:15,
            marginTop:16,
            marginHorizontal:8,

        }
    }

})

export default createAppContainer(DrawNavigater);


    