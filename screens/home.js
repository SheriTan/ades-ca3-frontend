import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Thread from '../components/thread';
import axios from 'axios';

const Home = ({ route, navigation }) => {
    // const url = 'http://127.0.0.1:19000';
    const url = 'https://spdiscuss.herokuapp.com';

    const [threadList, setThreadList] = useState([]);
    const { userObj } = route.params;

    // Getting threads
    axios.get(`${url}/thread`)
        .then((response) => {
            const threads = response.data;
            return setThreadList(threads);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <View style={styles.container}>

            {/*Discusssion Overview*/}
            <ScrollView>
                <View style={styles.overviewWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.sectionTitle}>SPDiscuss</Text>
                        <TouchableOpacity 
                        onPress = {()=> {navigation.navigate('SignInUp');}}
                        style={styles.signInUp}>
                            <Text style={styles.userStatus}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.user}>Welcome, {userObj.username}</Text>

                    <View style={styles.items}>
                        {/*Discussion Thread Cards*/}
                        {
                            threadList.map((val, index)=>{
                                return (
                                    <TouchableOpacity key={index}
                                    onPress={()=>navigation.navigate('ViewPost', {postObj:val, user: userObj })}>
                                    <Thread
                                    textTitle={val.title}
                                    textBody={val.description}
                                    user={val.username}
                                    />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>

            {/*Create A New Thread*/}
            <View style={styles.writeThread}>
                <TouchableOpacity style={styles.addWrapper} onPress={() => navigation.navigate('AddPost', { user: userObj })}>
                    <Text style={styles.addThread}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        flexDirection: 'column',
        flexGrow: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    signInUp: {
        width: 78,
        height: 35,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    userStatus: {
        fontSize: 18,
        color: '#fff'
    },
    user: {
        fontSize: 18,
        color: '#fff'
    },
    overviewWrapper: {
        marginTop: 60,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30
    },
    writeThread: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        alignSelf: 'flex-end',
    },
    addWrapper: {
        width: 70,
        height: 70,
        borderRadius: 60,
        backgroundColor: '#b61a2b',
        borderColor: '#8c101e',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addThread: {
        color: '#121212',
        fontSize: 28
    }
});

export default Home;