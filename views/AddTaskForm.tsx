import React, { useState } from 'react';
import {View, StyleSheet, Button }  from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addTaskToDatabase } from '../api/tasklist';


const TaskManager: React.FC = () => {
    const [title, setTitleValue] = useState();
    const [resume, setResumeValue] = useState();

    const handleValidation = () => {
        try {
            addTaskToDatabase(title, resume, 'to do');
            console.log('successfuly added task to list');
        } catch {
            console.log('error while adding task to list');
        }
    }

    return (
        <View>
            <TextInput style={{backgroundColor: '#fff', textAlign: 'center', borderWidth: 1}} placeholder="title value" onChangeText={value => setTitleValue(value)} />
            <TextInput style={{backgroundColor: '#fff', borderWidth: 1}} placeholder="resume value" onChangeText={value => setResumeValue(value)} />
            <Button title="Add Task" onPress={() => handleValidation()}/>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default TaskManager;