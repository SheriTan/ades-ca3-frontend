import React, { useState } from 'react';
import { StyleSheet, TextInput, Keyboard, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
    // const url = 'http://127.0.0.1:19000';
    const url = 'https://spdiscuss.herokuapp.com';
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');

    // This function executes when user clicks on Sign Up
    const register =()=> {
        // This is to check the user details in cmd
        console.log("--------------------------------------------");
        console.log("Checking User Details...")
        console.log("--------------------------------------------");
        console.log("Username: "+uname);
        console.log("Password: "+pwd);
        console.log("--------------------------------------------");

        // Sending post request
        axios.post(`${url}/users`, {
            username: uname,
            password: pwd
        }).then(()=>{
            console.log("Insert A User - Success!");

            Alert.alert(
                "Registered as an SPDiscuss User!",
                "Thank you for registering as a user :)\nNow please login as a user."
            );

            navigation.navigate('login_tab');
        }).catch((error)=>{
            console.log(error);

            if (error.response.status === 400){
            Alert.alert(
                "Error",
                "Please fill in all fields!"
            );

            } else if (error.response.status === 422){
                Alert.alert(
                    "Error",
                    "The username provided already exists.\nPlease try a different username."
                );

            }else {
                Alert.alert(
                    "Error",
                    "You have faced an unknown error :("
                );
            }
        })

        Keyboard.dismiss();
        setUname(null);
        setPwd(null);
    }

    return (
        <View style={styles.container}>

                <Text style={styles.title}>SPDiscuss: Register</Text>

                {/*Sign Up Inputs*/}
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

                {/*Sign Up Button*/}
                <TouchableOpacity style={styles.registerBtn}
                onPress={()=> register()}>
                    <Text style={styles.registerBtnTxt}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 4,
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
    registerBtn: {
        alignSelf: 'center',
        backgroundColor: '#680712',
        borderColor: '#62000b',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 12,
        width: 125
    },
    registerBtnTxt: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    }
});

export default Register;