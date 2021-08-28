import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as StudentContext } from '../context/StudentContext';
import { Context as CourseContext } from '../context/CourseContext';
import { auth, db } from '../firebase/fire';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as RootNavigation from '../RootNavigation';

const DetailScreen = ({ route, navigation }) => {
    const { description, id} = route.params;
    const { getStudents, state } = useContext(StudentContext);
    const { enroll } = useContext(CourseContext);
    const displayName = auth.currentUser.displayName;
    const photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1280px-User-avatar.svg.png";

    console.log(photoURL);

    useEffect(()=> {
        navigation.addListener('focus', () => {
            getStudents(id);
        });
    }, []);

    // may have to use useCallback hook here
    const submit = async (uid) => {
        db.collection('chats').add({
            createdAt: String(new Date()),
            members: [uid, auth.currentUser.uid],
            lastUpdated: String(new Date())
        })
        .then((docRef) =>{
            navigation.navigate('Chat',{ chatID: docRef.id});
        })
        .catch(error =>{
            console.log(error.message);
        });

    }

    return (
        <View style= {styles.container}>
            <Text h2>Detail Screen</Text>
            <Spacer>
            <Button title="Enroll" onPress={() => {
                enroll({id, displayName});
                getStudents(id);
            }}/>
            </Spacer>
            <Text h4>{ description }</Text>
            <Spacer/>
            <Text h2>Class List</Text>
            <FlatList 
                data={ state }
                extraData={ state }
                keyExtractor={student => student.id}
                renderItem={({ item }) => {
                    return(
                        <View style={ styles.row }>
                            <TouchableOpacity style={styles.userName}>
                                <Text h4>{ item.name }</Text>
                                <Image source={{ uri: photoURL }} style={styles.profilePic}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={submit} style={styles.addIcon}>
                                <Ionicons name="person-add-sharp" size={24} color="black" onPress={ () => submit(item.id)} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="message1" size={24} color="black" onPress={ () => submit(item.id)}/>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    userName:{
        flex: 1,
        flexDirection: 'row'
    },
    addIcon:{
        marginLeft: 0,
        paddingLeft: 10,
        marginRight: 20,
    },
    profilePic: {
        width: 20,
        height: 20
    }
})

export default DetailScreen;
