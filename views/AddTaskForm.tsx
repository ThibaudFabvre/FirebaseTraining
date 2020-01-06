import React, { useState } from 'react';
import {View, StyleSheet, Button }  from 'react-native';
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
            <TextInput style={{backgroundColor: '#fff', textAlign: 'center', borderWidth: 1}} placeholder="title value" onChangeText={value => setTitleValue(value)} />
            <TextInput style={{backgroundColor: '#fff', borderWidth: 1}} placeholder="resume value" onChangeText={value => setResumeValue(value)} />
            <Button title="Add Task" onPress={() => handleValidation()}/>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default AddTaskForm;