import { StyleSheet, Text, Image, View, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FocusAwareStatusBar from '../FocusAwareStatusBar'
import IconButton from '../IconButton';

export default function About({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FocusAwareStatusBar backgroundColor="rgba(0,0,0,1)" barStyle="light-content" />

            <TouchableOpacity
                style={styles.button_style}
                onPress={() => {
                    Linking.openURL("https://dijkstra-edu.github.io/Dijkstra-Web/");
                }}>
                <Image
                    source={require('../../assets/about-icon.png')}
                    style={{ width: 100, height: 100, alignSelf: 'center' }}
                />
            </TouchableOpacity>
            <Text style={styles.text_header}>Dijkstra</Text>
            <View style={styles.buttons}>
                <IconButton name="infocirlceo" type="AntDesign" size={20} color="#fff" url="https://forms.gle/XXT1GGEmmev6hueM6" />
                <IconButton name="github" type="AntDesign" size={20} color="#fff" url="https://github.com/Dijkstra-Edu" />
                <IconButton name="linkedin-square" type="AntDesign" size={20} color="#fff" url="https://www.linkedin.com/company/dijkstra-edu/" />
                <IconButton name="discord" type="MaterialCommunityIcons" size={20} color="#fff" url="https://discord.com/invite/Ct82yF3KAU" />
                <IconButton name="instagram" type="MaterialCommunityIcons" size={20} color="#fff" url="https://www.instagram.com/jonathansamuel296/" />
            </View>
            <Text style={styles.text_paragraph}>
                Dijkstra is an Open-Source, Non-Profit organization built for the student community by students.
                Dijkstra is currently under development, and aims to provides a safe space for learning, collaboration,
                and mentorship, and to help students by defining a clear path to success, be it with improving fundamentals
                like data structures and algorithms, networks, operating systems to Developmental knowledge to be work-ready
                in the industry. Students will be able to get real-time work experience by collaborating on the development
                of Dijkstra. This would include skills in full-stack development, micro-services development, cloud services,
                etc. All of which will be made available for students to access and work on. In simple terms, Dijkstra aims
                to be a one-stop solution for any aspiring CS student to become industry-ready.
                {"\n"}
            </Text>
            <Text style={styles.text_header_2}>
                We're currently looking for passionate students and Open-Source Developers for the following:
            </Text>
            <Text style={styles.text_paragraph_2}>
                - Application Development (MERN stack) {"\n"}
                - Web Development (MERN stack) {"\n"}
                - Discord Moderators {"\n"}
                - UI/UX Designers {"\n"}
                - Content Writers {"\n"}
                - Educators
            </Text>
            <Text style={styles.text_paragraph}>
                If you can help, please do reach out to us! :) Feel free to send a message through the info button above. You can check out our website via clicking on Dijkstra's logo above. Also, feel free to check out our GitHub and LinkedIn, and join our Discord Server.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },

    text_header: {
        fontSize: 24,
        fontWeight: "500",
        alignItems: 'center',
        color: "grey"
    },

    text_header_2: {
        fontSize: 14,
        color: "grey"
    },

    text_paragraph: {
        fontSize: 13,
        alignItems: 'center',
        padding: 5,
        textAlign: 'auto',
        color: "#d3d3d3"
    },

    text_paragraph_2: {
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        textAlign: 'left',
        color: "#d3d3d3"
    },

    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,

    },

    button_style: {
        padding: 5,
        marginHorizontal: 1,
    },
})