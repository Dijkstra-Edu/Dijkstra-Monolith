import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert } from 'react-native'
import React, { Children } from 'react'
import dateFormat from 'dateformat';
import Markdown from 'react-native-markdown-display';
import * as Linking from 'expo-linking';
import RelatedPosts from './RelatedPosts';
import Seperator from './Seperator';
import { getSinglePost } from '../API/post';

const { width } = Dimensions.get('window');

const BASE_URL = "";

export default function PostDetail({ route, navigation }) {
    const post = route.params?.post;
    const getThumbnail = (uri) => {
        if (uri) return { uri }
        return require('../assets/default.jpg');
    }

    // const rules = {
    //     paragraph: (node, children, parent, styles) => (<Text key={node.key} style={styles.paragraph} selectable >{children}</Text>),
    //     image: 
    // };

    const handleSinglePostFetch = async (slug) => {
        const { error, post } = await getSinglePost(slug);
        if (error) return console.log(error);
        navigation.push('PostDetail', { post });
    }

    const handleLinkPress = async (url) => {
        if (url.includes(BASE_URL)) {
            const slug = url.split(BASE_URL + '/')[1];
            if (!slug) return false;
            handleSinglePostFetch(slug);
            return false;
        }

        const res = await Linking.canOpenURL(url);
        if (res) Linking.openURL(url)
        else Alert.alert('Invalid URL', "Can not open broken Link.");
    }

    if (!post) return null;
    const { title, thumbnail, tags, createdAt, author, content } = post;

    return (
        <ScrollView>
            <Image source={getThumbnail(thumbnail)} style={{ width, height: width / 1.7 }} />
            <View style={{ padding: 10 }}>
                <Text style={{
                    fontWeight: "700",
                    color: "#383838",
                    fontSize: 22,
                    paddingVertical: 3,
                }}>{title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: "#827E7E" }}>By {author}</Text>
                    <Text style={{ color: "#827E7E" }}>{dateFormat(createdAt, "mediumDate")}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text selectable style={{ color: "#827E7E" }}>Tags: </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {tags.map((tag, index) => (
                            <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                                #{tag}
                            </Text>
                        ))}
                    </View>
                </View>

                <Markdown
                    //rules={rules} 
                    style={styles.markdown}
                    onLinkPress={handleLinkPress}>
                    {content}
                </Markdown>
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{
                    fontWeight: "bold",
                    color: "#383838",
                    marginBottom: 10,
                    fontSize: 22,
                }}>Related Posts</Text>
                <Seperator />
                <RelatedPosts postId={post.id} onPostPress={handleSinglePostFetch} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    markdown: {
        paragraph: {
            lineHeight: 22,
            color: "#545050",
            letterSpacing: 0.8,
        },
        body: {
            fontSize: 16,
        },
        link: {
            color: "#7784F8"
        },
        list_item: {
            color: "#545050",
            paddingVertical: 5,
        }
    }
})