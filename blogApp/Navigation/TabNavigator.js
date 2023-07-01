import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import Search from '../components/Screens/Search';
import About from '../components/Screens/About';
import AppNavigator from './AppNavigator';
import Home from '../components/Screens/Home';
import Discussion from '../components/Screens/Discussions';


const tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <tab.Navigator initialRouteName={Home} screenOptions={{
      headerShown: false, 
      tabBarActiveTintColor: "#008000", 
      tabBarInactiveTintColor: "#fff", 
      tabBarActiveBackgroundColor: "#000",
      tabBarInactiveBackgroundColor: "#000",
      }} >
        <tab.Screen  name='Home Page' component={AppNavigator} options={{tabBarIcon: ({focused, color, size}) => {
          return <AntDesign name="home" size={size} color={color} />;
        }, }}/>
        <tab.Screen  name='Discussions' component={Discussion} options={{tabBarIcon: ({focused, color, size}) => {
          return <AntDesign name="book" size={size} color={color} />;
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
