import React from 'react';
import { FlatList } from 'react-native';

const List = ({ state }) => {
    return (
        <FlatList 
        data={ state }
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
    );
};