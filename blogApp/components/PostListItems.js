import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import dateFormat from 'dateformat'

const IMAGE_WIDTH = 100

export default function PostListItems({ post, onPress }) {
    const { thumbnail, title, createdAt, author } = post

    const getThumbnail = (uri) => {
        if (uri) return { uri };
        return require('../assets/default.jpg')
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Image source={getThumbnail(thumbnail)} style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH / 1.7 }} />
            <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text2}>{dateFormat(createdAt, "mediumDate")} - {author}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable: {
        flexDirection: 'row',
    },

    text: {
        fontSize: 16,
        fontWeight: "700",
        color: "#383838"
    },

    text2: {
        fontSize: 14,
        //fontWeight: "700",
        color: "#d3d3d3"
    }
});