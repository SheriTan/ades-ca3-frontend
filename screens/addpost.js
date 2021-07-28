import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// This is a form page for user to fill up and create a post
const AddPost = ({ route, navigation }) => {
    // const url = 'http://127.0.0.1:19000';
    const url = 'https://spdiscuss.herokuapp.com';
    const { user } = route.params;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postUser] = useState(user.user_id);
    const [token] = useState(user.token);

    const requestConfig = {
        headers: {"Authorization": "Bearer " + token}
    }

    // This function executes when user clicks on Create Post
    const addHandler = () => {
        // This is to check the post details in cmd
        console.log("--------------------------------------------");
        console.log("Checking Post Details...")
        console.log("--------------------------------------------");
        console.log("Post Title: " + postTitle);
        console.log("Post Body: " + postBody);
        console.log("Posted by: " + postUser);
        console.log("--------------------------------------------");

        // Sending post request
        axios.post(`${url}/create/${postUser}`, {
            title: postTitle,
            description: postBody
        },
        requestConfig)
        .then(() => {
            console.log("Insert A Post - Success!");

            Alert.alert(
                "Created A Post",
                "You have created 1 post."
            );
        })
        .catch((error)=>{
            console.log(error);

            if (error.response.status === 401){
                Alert.alert(
                    "Error",
                    "You are not a valid user!\nPlease sign in or resgister as one."
                );
                navigation.navigate('SignInUp');

            } else if (error.response.status === 400){
                Alert.alert(
                    "Error",
                    "Please fill in the title!"
                );

            } else {
                Alert.alert(
                    "Error",
                    "You have faced an unknown error :("
                );
            }
        })

        Keyboard.dismiss();
        setPostTitle(null);
        setPostBody(null);
    };


    return (
        <View style={styles.container}>

            {/*Back Button*/}
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.btnTxt}>ᐊ Back</Text>
                </TouchableOpacity>
            </View>

            {/*Post Input*/}
            <TextInput style={styles.titleinput} placeholder="Title" placeholderTextColor="#fff"
                value={postTitle} onChangeText={text => setPostTitle(text)} />
            <TextInput style={styles.textinput} placeholder="Your Text Post (Optional)"
                placeholderTextColor="#fff" multiline={true} numberOfLines={30}
                value={postBody} onChangeText={text => setPostBody(text)} />

            {/*Post Button*/}
            <TouchableOpacity style={styles.createWrapper} onPress={() => addHandler()}>
                <MaterialCommunityIcons name="note-plus-outline"
                    color="#121212"
                    size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginTop: 70,
        marginHorizontal: 20
    },
    btnTxt: {
        fontSize: 22,
        color: '#fff',
    },
    titleinput: {
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#212121',
        color: '#fff',
        borderColor: '#1e1e1e',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20
    },
    textinput: {
        width: '90%',
        height: 300,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#212121',
        color: '#fff',
        borderColor: '#1e1e1e',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 20
    },
    createWrapper: {
        marginTop: 10,
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        backgroundColor: '#b61a2b',
        borderColor: '#8c101e',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})

export default AddPost;