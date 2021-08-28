import React, { useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as GroupContext } from '../context/GroupContext';


const GroupScreen = ({ navigation }) => {
    const { state, getGroups } = useContext(GroupContext);
    useEffect(()=> {
        navigation.addListener('focus', () => {
            getGroups();
        });
    }, []);
    

    return (
        <SafeAreaView style={styles.container}>
            <Text h2>Group List</Text>
            <FlatList 
                data={state}
                keyExtractor={group => group.name}
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
                                <Text h4>{item.course} - {item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
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
});

export default GroupScreen;