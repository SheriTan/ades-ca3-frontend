import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Comment from '../components/comment';
import axios from 'axios';

const ViewPost = ({ route, navigation }) => {
    // const url = 'http://127.0.0.1:19000';
    const url = 'https://spdiscuss.herokuapp.com';
    const { postObj, user } = route.params;
    const [uname, setUser] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [token] = useState(user.token);

    const requestConfig = {
        headers: { "Authorization": "Bearer " + token }
    }

    // Getting Thread Info + Comments
    const getData = () => {
        // Getting Thread
        axios.get(`${url}/thread/${postObj.thread_id}`)
            .then(() => {
                setUser(postObj.username);
                setTitle(postObj.title);
                setBody(postObj.description);
            })
            .catch((error) => {
                console.log('failure');
                console.log(error);
            });

        // Getting Comments
        axios.get(`${url}/comments/${postObj.thread_id}`)
            .then((response) => {
                return setCommentList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // Posting Comment
    const addComment = () => {
        // Sending post request
        axios.post(`${url}/reply/${user.user_id}/thread/${postObj.thread_id}`, {
            content: comment
        },
            requestConfig)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.log(error);

                if (error.response.status === 403) {
                    Alert.alert(
                        "Error",
                        "You are either an invalid user or this is an invalid thread!\nIf you are an invalid user, please sign in or register as one."
                    )
                } else if (error.response.status === 400) {
                    Alert.alert(
                        "Error",
                        "Please comment something!"
                    );

                } else {
                    Alert.alert(
                        "Error",
                        "You have faced an unknown error :("
                    );
                }
            })

        Keyboard.dismiss();
        setComment(null);
    }

    useEffect(() => {
        getData();
        return () => {
            setCommentList([]);
        }
    }, []);

    return (
        <View style={styles.container}>

            {/*Back Button*/}
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.btnTxt}>ᐊ Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/*Post Card*/}
                <View style={styles.postContainer}>
                    <Text style={styles.userText}>Posted by: {uname}</Text>
                    <Text style={styles.postTitle}>{title}</Text>
                    <Text style={styles.postBody}>{body}</Text>
                </View>

                <Text style={styles.commentHead}>💬 COMMENTS</Text>

                {/*Comment Cards*/}
                {
                    commentList.map((val, index) => {
                        return (
                            <Comment
                                key={index}
                                textContent={val.content}
                                user={val.username}
                            />
                        )
                    })
                }

            </ScrollView>

            {/*Create Comment Section*/}
            <View style={styles.commentWrapper}>
                <TextInput style={styles.commentInput}
                    placeholder='Add a comment...'
                    placeholderTextColor='#fff'
                    value={comment}
                    onChangeText={text => setComment(text)} />
                <TouchableOpacity
                    onPress={() => addComment()}
                    style={styles.postCommentBtn}>
                    <MaterialCommunityIcons name="reply-outline"
                        color="#121212"
                        size={30} />
                </TouchableOpacity>
            </View>
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
    postContainer: {
        width: 400,
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#212121'
    },
    userText: {
        color: '#fff',
        opacity: 0.7,
        marginBottom: 10
    },
    postTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    postBody: {
        color: '#fff',
        fontSize: 16,
    },
    commentHead: {
        color: '#fff',
        opacity: 0.5,
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    commentWrapper: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    commentInput: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        backgroundColor: '#212121',
        color: '#fff',
        borderColor: '#1e1e1e',
        borderRadius: 30,
        borderWidth: 1,
        width: 315
    },
    postCommentBtn: {
        width: 65,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b61a2b',
        borderColor: '#8c101e',
        borderWidth: 1,
        paddingBottom: 4
    },
    postCommentTxt: {
        fontSize: 28
    }
})



export default ViewPost;