import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Article from '../component/articles'
import Radio from '../component/radio'
import Profile from '../component/profile'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {colorCode} from '../assets/colorcode'
import { TabBar } from "react-native-animated-nav-tab-bar";


const Tab = createBottomTabNavigator();

const Tabs = createBottomTabNavigator();
export default function App() {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let colors;
  
              if (route.name === 'Home') {
                colors = focused ? 'colorCode[1]' : colorCode[2];
                return (<Ionicons name='ios-home' size={size} color={color} />
                    );
              } else if (route.name === 'Radio') {
                // colors = focused ? 'red' : 'white';
                return (<Ionicons name='md-radio' size={size} color={color} />
                    );
              }else if (route.name === 'Profile') {
                // colors = focused ? 'red' : 'white';
                return (<FontAwesome5 name='user' size={size} color={color} />);
              }
              
            },
          })}

 
          tabBar={props => (
            <TabBar
              activeColors={[colorCode(0), colorCode(1), colorCode(3)]} // or activeColors={'#e6b580'}
              activeTabBackgrounds={[colorCode[1], colorCode[1], colorCode[1]]} // or activeTabBackgrounds={'#ede7e6'}
              tabBarBackground	= {colorCode(4)}
              {...props}
            />)}
        >
          
          <Tabs.Screen name="Home" component={Article} />
          <Tabs.Screen name="Radio" component={Radio} />
          <Tabs.Screen name="Profile" component={Profile} />

        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
