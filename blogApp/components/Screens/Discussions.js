import { StyleSheet, Text, View } from 'react-native'
import FocusAwareStatusBar from '../FocusAwareStatusBar'
import React from 'react'

export default function Discussion() {
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor="rgba(255,255,255,1)" barStyle="dark-content"/>
            <Text>Discussions Page (WIP)</Text>
        </View>
    )
}

const styles = StyleSheet.create({})