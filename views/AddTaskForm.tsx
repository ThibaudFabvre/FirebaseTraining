import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight }  from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addTaskToDatabase } from '../api/tasklist';

type Props = {
    addTaskToList: void;
}

const AddTaskForm: React.FC<Props> = ({ addTaskToList }) => {
    const [title, setTitleValue] = useState();
    const [resume, setResumeValue] = useState();

    const handleValidation = () => {
        try {
            const newTask = {title: title, resume: resume, status: 'to do'};
            addTaskToList(newTask);
            addTaskToDatabase(title, resume, 'to do');
            console.log('successfully added task to list');
        } catch {
            console.log('error while adding task to list');
        }
    }

    return (
        <View>
            <TextInput style={styles.addTaskFormInput} placeholder="title" onChangeText={value => setTitleValue(value)} />
            <TextInput style={styles.addTaskFormInput} placeholder="resume" onChangeText={value => setResumeValue(value)} />
            <TouchableHighlight style={styles.addTaskButton} onPress={() => handleValidation()}>
                <Text style={styles.addTaskButtonText}>Add Task</Text>
            </TouchableHighlight>
        </View>
    )
};

const styles = StyleSheet.create({
    addTaskFormInput: {
        backgroundColor: '#fff', 
        textAlign: 'center',
        paddingVertical: 10, 
        borderWidth: 1
    },
    addTaskButton: {
        backgroundColor: '#882692', 
        alignSelf: 'center', 
        paddingBottom: 20, 
        paddingTop: 20, 
        width: '100%'
    },
    addTaskButtonText: {
        color: 'white', 
        alignSelf: 'center', 
        fontWeight: 'bold'
    },
});

export default AddTaskForm;