import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <tab.Navigator>
        <tab.Screen name='Home' component={HomeScreen} />
        <tab.Screen name='Search' component={SearchScreen} />
        <tab.Screen name='About' component={AboutScreen} />
    </tab.Navigator>
  )
}
