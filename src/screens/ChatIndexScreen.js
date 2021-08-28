import React, {useEffect, useContext, useState } from 'react'
import { Context as ChatContext } from '../context/ChatContext';
import { auth, db } from '../firebase/fire';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';

const ChatIndexScreen = ({ navigation }) => {
    const { state, getChats } = useContext(ChatContext);
    useEffect(()=> {
        navigation.addListener('focus', async () => {
            await getChats();
        });
    }, []);
    
    return (
        <View style={styles.container}>
            <Text h2>Chat List</Text>
            <FlatList 
                data={state}
                keyExtractor={chat => chat.id}
                renderItem={({ item }) => {
                    return(
                        <View style={styles.row}>
                            <TouchableOpacity onPress={ () => navigation.navigate('Chat',{ chatID: item.id})}>
                                {console.log(item)}
                                <Text>{ item.name }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
}
    

const styles=StyleSheet.create({
    container:{
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'grey'
    }
});

export default ChatIndexScreen;
