import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import About from '../component/about'
import TabNavigator from './tabnavigator'
import Blogger from '../component/bloger'
import Header from '../screens/header'




const about={
    About:{
        screen:About,
        navigationOptions:({navigation})=>{
            return({
                headerTitle:()=><Header navigation={navigation} />}
            )
        }
    }
}

const article={
    Article:{
        screen:TabNavigator,
        navigationOptions:({navigation})=>{
            return({
                headerTitle:()=><Header navigation={navigation}/>}
            )
        }
    },
    
}

const blogger={
    Blogger:{
        screen:Blogger,
    navigationOptions:({navigation})=>{
        return({
            headerTitle:()=><Header navigation={navigation}/>}
        )
    }
    }
}
export const ArticleScreen=createStackNavigator(article,{
    defaultNavigationOptions:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee',height:70,}
    }
})
export const BlogerScreen=createStackNavigator(blogger,{
    defaultNavigationOptions:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee',height:70,}
       
    }
})
export const AboutScreen=createStackNavigator(about,{
    defaultNavigationOptions:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee',height:70,}
        
    }
})


