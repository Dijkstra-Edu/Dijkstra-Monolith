import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import Search from '../components/Screens/Search';
import About from '../components/Screens/About';
import AppNavigator from './AppNavigator';
import Home from '../components/Screens/Home';


const tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <tab.Navigator screenOptions={{headerShown: false}}>
        <tab.Screen  name='HomeScreen' component={AppNavigator} options={{tabBarIcon: ({focused, color, size}) => {
          return <AntDesign name="home" size={size} color={color} />;
        },}}/>
        <tab.Screen name='Search' component={Search} options={{tabBarIcon: ({focused, color, size}) => {
          return <AntDesign name="search1" size={size} color={color} />;
        }}}/>
        <tab.Screen name='About' component={About} options={{tabBarIcon: ({focused, color, size}) => {
          return <Feather name="info" size={size} color={color} />
        }}}/>
    </tab.Navigator>
  )
}
