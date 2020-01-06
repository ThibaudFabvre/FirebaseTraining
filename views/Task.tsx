import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { deleteTaskFromList, updateTaskFromList } from '../api/tasklist';

interface Props {
    title: string,
    resume: string,
    id: number,
    status: string,
    deleteTask: void;
    reloadTasksList: void;
}

const Task: React.FC<Props> = ({ title, resume, id, status, deleteTask, reloadTasksList}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formTitle, setNewTitle] = useState();
    const [formResume, setNewResume] = useState();
    const [formStatus, setNewStatus] = useState();


    const handleCancel = () => {
        setIsFormOpen(false);
    }

    const handleValidation = () => {
        try {
            const updatedTaskData = {title: formTitle, resume: formResume, status: formStatus};
            updateTaskFromList(id, updatedTaskData);
            reloadTasksList();
            console.log('updated task successfully')
            setIsFormOpen(false);
        } catch {
            console.log('could not update task');
        }
    }

    const handleDeletion = () => {
        try {
            deleteTask(id);
            deleteTaskFromList(id);
            console.log('successfuly deleted task from list');
        } catch {
            console.log('could not remove task from list');
        }
    }

    return (
        <View style={styles.defaultCardStyle}>
            {!isFormOpen ?
                <>
                    <Text style={{textAlign: 'center', padding: 10}}>{title}</Text>
                    <Text style={{padding: 10}}>{resume}</Text>
                </>
                :
                <>
                    <TextInput style={{paddingLeft: 10}} placeholder='new title' onChangeText={ input => setNewTitle(input)}/>
                    <TextInput style={{paddingLeft: 10}} placeholder='new resume' onChangeText={ input => setNewResume(input)}/>
                    <TextInput style={{paddingLeft: 10}} placeholder='status' onChangeText={ input => setNewStatus(input)}/>
                </>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {!isFormOpen ?
                <>
                    <Button title='edit' onPress={() => setIsFormOpen(true)} />
                    <Button title='delete' onPress={() => handleDeletion()} />
                </>
                :
                <>
                    <Button title='V' style={{color: '#0C0'}} onPress={() => handleValidation()} />
                    <Button title='X' style={{color: '#F00'}} onPress={() => handleCancel()} />
                </>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    defaultCardStyle: {
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 5,
        width: '80%',
        margin: 10,
    },
});

export default Task;