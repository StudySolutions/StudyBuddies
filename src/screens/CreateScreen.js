import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext';

const CreateScreen = () => {
    const { addCourse } = useContext(CourseContext);
    const [ type, setType ] = useState('');
    const [ code, setCode ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    return(
        <View>
            <Input label="Course Type" 
                onChangeText={setType} value={type}
                autoCapitalize="none" autoCorrect={false} 
            />
            <Input label="Course Code" 
                onChangeText={setCode} value={code}
                autoCapitalize="none" autoCorrect={false}
                />
            <Input label="Course Name" 
                onChangeText={setName} value={name}
                autoCapitalize="none" autoCorrect={false}
            />
            <Input label="Course Description" 
                onChangeText={setDescription} value={description}
                autoCapitalize="none" autoCorrect={false}
            />
            <Button title="Add" onPress={()=> addCourse({code, description, name, type})}/>
        </View>
    );
};

export default CreateScreen;

