import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext';
import { Feather } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {
    const { state, getCourses } = useContext(CourseContext);
    useEffect(()=> {
        navigation.addListener('focus', () => {
            getCourses();
        });
    }, []);
    

    return (
        <View style={styles.container}>
            <Text h2>Course List</Text>
            <FlatList 
                data={state}
                keyExtractor={course => course.name}
                renderItem={({ item }) => {
                    return(
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Detail', 
                                { 
                                    description: item.description, 
                                    id: item.id
                                }
                                )}}>
                                <Text h4>{item.type}{item.code} - {item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
}

HomeScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        ),
      };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'grey'
    }
})

export default HomeScreen;