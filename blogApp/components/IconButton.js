import React from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Linking, TouchableOpacity } from 'react-native'

export default function IconButton({ name, type, size, color, url }) {
    if (type == "AntDesign") {
        return (
            <TouchableOpacity style={styles.button_style} onPress={() => { Linking.openURL(url) }}>
                <AntDesign name={name} color={color} size={size} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.button_style} onPress={() => { Linking.openURL(url) }}>
                <MaterialCommunityIcons name={name} color={color} size={size} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button_style: {
        padding: 5,
        marginHorizontal: 1,
    },
})
