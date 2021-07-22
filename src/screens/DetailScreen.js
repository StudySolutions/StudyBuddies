import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as StudentContext } from '../context/StudentContext';
import { List } from '../components/List';

const DetailScreen = ({ route, navigation }) => {
    const { description, id, onSubmit } = route.params;
    const { state, getStudents } = useContext(StudentContext);

    useEffect(()=> {
        console.log('ID change');
        navigation.addListener('focus', () => {
            getStudents({ id });
        });
    }, [id]);
    

    return (
        <View style= {styles.container}>
            <Text h2>Detail Screen</Text>
            <Spacer>
            <Button title="Enroll" onPress={ onSubmit }/>
            </Spacer>
            <Text h4>{ description }</Text>
            <Spacer/>
            <Text h2>Class List</Text>
            <FlatList 
                data={ state.students }
                extraData={ state }
                keyExtractor={student => student.id}
                renderItem={({ item }) => {
                    return(
                        <View style={ styles.row }>
                            <TouchableOpacity>
                                <Text h4>{ item.name }</Text>
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
    }
})

export default DetailScreen;
