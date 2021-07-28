import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Comment = ({ textContent, user}) => {

    return (
        <View style = {styles.item}>
            <Text style = {styles.itemHeader}>Posted by: {user}</Text>
            <Text style = {styles.itemText}>{textContent}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#212121',
        borderRadius: 5,
        marginBottom: 5,
        padding: 15
    },
    itemHeader: {
        color: '#fff',
        opacity: 0.7,
        marginBottom: 10
    },
    itemText: {
        color: '#fff',
    }
})

export default Comment;