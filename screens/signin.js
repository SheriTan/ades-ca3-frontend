import React, { useState } from 'react';
import { StyleSheet, TextInput, Keyboard, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
    // const url = 'http://127.0.0.1:19000';
    const url = 'https://spdiscuss.herokuapp.com';
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');

    const login = () => {
        // This is to check the user details in cmd
        console.log("--------------------------------------------");
        console.log("Checking User Details...")
        console.log("--------------------------------------------");
        console.log("Username: " + uname);
        console.log("Password: " + pwd);
        console.log("--------------------------------------------");

        axios.post(`${url}/login/`, {
            username: uname,
            password: pwd
        }).then((response) => {
            console.log("Logging In - Success!")
            console.log('logged in as user #: ' + response.data.user_id);
            navigation.navigate('Home', { userObj: response.data });
        }).catch((error) => {
            console.log(error);

            if (error.response.status === 400 || error.response.status === 401) {
                Alert.alert(
                    "Error",
                    "Wrong username or password!\nPlease try again."
                );

            } else if (error.response.status === 500) {
                Alert.alert(
                    "Error",
                    "Internal Server Error"
                );
            }
        })

        Keyboard.dismiss();
        setUname(null);
        setPwd(null);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>SPDiscuss: Login</Text>

            {/*Sign In Inputs*/}
            <TextInput
                onChangeText={text => setUname(text)}
                value={uname}
                placeholder='Username'
                style={styles.txtinput} />
            <TextInput
                onChangeText={text => setPwd(text)}
                value={pwd}
                placeholder='Password'
                style={styles.txtinput}
                secureTextEntry={true} />

            {/*Sign In Button*/}
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => login()}>
                <Text style={styles.loginBtnTxt}>SIGN IN</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b61a2b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    txtinput: {
        backgroundColor: '#fff',
        width: 300,
        borderColor: '#9E424C',
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 12
    },
    loginBtn: {
        alignSelf: 'center',
        backgroundColor: '#680712',
        borderColor: '#62000b',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 12,
        width: 125
    },
    loginBtnTxt: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    }
});

export default Login;