import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Thread = ({ textTitle, textBody, user}) => {

    return (
        <View style = {styles.item}>
            <Text style = {styles.itemHeader}>Posted by: {user}</Text>
            <Text style = {styles.itemTitle}>{textTitle}</Text>
            <Text style = {styles.itemText}>{textBody}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#212121',
        borderRadius: 5,
        marginBottom: 20,
        padding: 15
    },
    itemHeader: {
        color: '#fff',
        opacity: 0.7,
        marginBottom: 10
    },
    itemTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemText: {
        color: '#fff',
        opacity: 0.7,
    }
})

export default Thread;