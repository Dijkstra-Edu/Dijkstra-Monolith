import { ScrollView, StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants'
import { getSinglePost, searchPost } from '../../API/post';
import PostListItems from '../PostListItems';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigation = useNavigation();
    const [notFound, setNotFound] = useState(false);

    const handleOnSubmit = async () => {
        setNotFound(false);
        if (!query.trim()) return;

        //Submit the form
        const { error, posts } = await searchPost(query);
        if (error) return console.log(error);

        if (!posts.length) return setNotFound(true)
        setResults([...posts]);
    }

    const handlePostPress = async (slug) => {
        const { error, post } = await getSinglePost(slug);
        if (error) return console.log(error);
        navigation.navigate("PostDetail", { post });
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={(text) => setQuery(text)}
                placeholder='Search'
                style={styles.searchInput}
                onSubmitEditing={handleOnSubmit} />

            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {notFound
                    ? (<Text style={{ fontWeight: "Bold", fontSize: 22, color: "rgba(0,0,0,0.5)", textAlign: "center", paddingVertical: 15 }}>No Results Found</Text>)
                    : (results.map((post) => {
                        return (
                            <View key={post.id} style={{ marginTop: 10 }}>
                                <PostListItems post={post} key={post.id} onPress={() => handlePostPress(post.slug)} />
                            </View>
                        );
                    }))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        padding: 10,
        flex: 1,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: "#383838",
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
    }
})
