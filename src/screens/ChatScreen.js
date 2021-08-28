import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native';
import { auth, db } from '../firebase/fire';

const ChatScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);

    const { chatID } = route.params;
  
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <SafeAreaView style={{marginRight: 20}}>
                <Avatar rounded source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1280px-User-avatar.svg.png" 
                }}/>   
                </SafeAreaView>
            )
        });
        

        const unsubscribe = db.collection('chats').doc(chatID).collection('messages')
        .orderBy('createdAt', 'desc').onSnapshot(snapshot => 
            setMessages(
                snapshot.docs.map(doc =>({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user    
                }))
            ));
        return unsubscribe;
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        }=messages[0]
        
        db.collection('chats').doc(chatID).collection('messages').add({
            _id,
            createdAt,
            text,
            user
        })
        db.collection('chats').doc(chatID).update({
          lastUpdated: String(new Date())
        })  
      }, [])

      return (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL
          }}
        />
      )
    
}

export default ChatScreen;