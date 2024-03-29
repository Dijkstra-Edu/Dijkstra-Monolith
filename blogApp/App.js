import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import TabNavigator from './Navigation/TabNavigator'
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from './components/NoInternet';

const CUSTOM_THEME = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#fff" } }

export default function App() {
  const [noInternet, setNoInternet] = useState(false);
  const [reqDark, setReqDark] = useState(false);
  const netInfo = useNetInfo();

  const fetchNetInfo = () => {
    const { isConnected, isInternetReachable } = netInfo;
    if (isConnected === false && isInternetReachable === false) setNoInternet(true);
    else setNoInternet(false);
  }

  useEffect(() => {
    fetchNetInfo()
  }, [netInfo])

  if (noInternet) return <NoInternet onRefresh={fetchNetInfo} />

  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      
      <TabNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})