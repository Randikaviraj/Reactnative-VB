import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import  {View,Text,} from 'react-native';
import Article from '../component/articles'
import Radio from '../component/radio'
import Profile from '../component/profile'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let colors;
  
              if (route.name === 'Home') {
                 colors = focused ? 'red' : 'white';
                return (<View style={{backgroundColor:colors,borderRadius:5,padding:2}}><Ionicons name='ios-home' size={size} color={color} /></View>
                    );
              } else if (route.name === 'Radio') {
                colors = focused ? 'red' : 'white';
                return (<View style={{backgroundColor:colors,borderRadius:5,padding:2}}><Ionicons name='md-radio' size={size} color={color} /></View>
                    );
              }else if (route.name === 'Profile') {
                colors = focused ? 'red' : 'white';
                return (<View style={{backgroundColor:colors,borderRadius:5,padding:2,paddingHorizontal:3,}}><FontAwesome5 name='user' size={size} color={color} /></View>);
              }
  
              
              
            },
          })}
          tabBarOptions={{
            activeTintColor: '#ff0000',
            inactiveTintColor: '#e67300',
          }}
        >
          
          <Tab.Screen name="Home" component={Article} />
          <Tab.Screen name="Radio" component={Radio} />
          <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
