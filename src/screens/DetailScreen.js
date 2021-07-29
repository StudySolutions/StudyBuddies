import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as StudentContext } from '../context/StudentContext';
import { Context as CourseContext } from '../context/CourseContext';
import { auth } from '../firebase/fire';
import { Ionicons } from '@expo/vector-icons'; 

const DetailScreen = ({ route, navigation }) => {
    const { description, id} = route.params;
    const { getStudents, state } = useContext(StudentContext);
    const { enroll } = useContext(CourseContext);
    const displayName = auth.currentUser.displayName;

    useEffect(()=> {
        navigation.addListener('focus', () => {
            getStudents(id);
        });
    }, []);

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
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addIcon}>
                                <Ionicons name="person-add-sharp" size={24} color="black" />
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
        flex: 1
    },
    addIcon:{
        marginLeft: 0,
        paddingLeft: 10,
        marginRight: 20,
    }
})

export default DetailScreen;
