import React, { useState } from 'react';
import { StyleSheet,Picker,  View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import { deleteTaskFromList, updateTaskFromList } from '../../api/tasklist';
import { theme } from '../../theme';

interface Props {
    title: string,
    resume: string,
    id: number,
    deleteTask: void;
    reloadTasksList: void;
}

const Task: React.FC<Props> = ({ title, resume, id, deleteTask, reloadTasksList}) => {
    
    /**
     * State
     */
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formTitle, setNewTitle] = useState('');
    const [formResume, setNewResume] = useState('');
    const [formStatus, setNewStatus] = useState();

    /**
     * Handlers
     */

    const handleCancel = () => {
        setIsFormOpen(false);
    }

    const handleValidation = () => {
        const newTitle = formTitle === '' ? title : formTitle;
        const newResume = formResume === '' ? resume : formResume;
        try {
            const updatedTaskData = {title: newTitle, resume: newResume, status: formStatus};
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
            console.log('successfully deleted task from list');
        } catch {
            console.log('could not remove task from list');
        }
    }

    /**
     * Context
     */

    return (
        <View style={[styles.defaultCardStyle, { backgroundColor: `${isFormOpen ? theme.mainColor : theme.secondaryColor}`}]}>
            {!isFormOpen ?
                <>
                    <Text style={styles.taskTitle}>{title}</Text>
                    <Text style={styles.taskResume}>{resume}</Text>
                </>
                :
                <>  
                    <TextInput style={[{ backgroundColor: `${isFormOpen ? theme.secondaryColor : theme.mainColor}`}, styles.taskInput ]} placeholder='new title' onChangeText={ input => setNewTitle(input)}/>
                    <TextInput style={[{ backgroundColor: `${isFormOpen ? theme.secondaryColor : theme.mainColor}`}, styles.taskInput ]} placeholder='new resume' onChangeText={ input => setNewResume(input)}/>
                    <Picker
                    selectedValue={formStatus}
                    style={[{backgroundColor: `${isFormOpen ? theme.secondaryColor : theme.mainColor}`}, styles.formStatusPicker]}
                    onValueChange={(status) =>
                        setNewStatus(status)
                    }>
                        <Picker.Item label="Select status" value={0}/>
                        <Picker.Item label="To do" value="to do" />
                        <Picker.Item label="In progress" value="in progress" />
                        <Picker.Item label="Done" value="done"/>
                    </Picker>
                </>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {!isFormOpen ?
                <>
                    <TouchableHighlight style={styles.taskButton} onPress={() => setIsFormOpen(true)}><Text style={styles.taskButtonText}>Edit</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.taskButton} onPress={() => handleDeletion()} ><Text style={styles.taskButtonText}>Delete</Text></TouchableHighlight>
                </>
                :
                <>
                    <TouchableHighlight style={styles.formButton} onPress={() => handleValidation()} ><Text style={styles.formButtonText}>V</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.formButton} onPress={() => handleCancel()} ><Text style={styles.formButtonText}>X</Text></TouchableHighlight>
                </>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    defaultCardStyle: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: theme.mainColor,
        width: '80%',
        margin: 10,
        overflow: "hidden",
    },
    taskTitle: {
        backgroundColor: theme.mainColor,
        fontWeight: 'bold',
        color: theme.secondaryColor,
        textAlign: 'center',
        padding: 10,
    },
    taskResume: { 
        padding: 10, 
    },
    taskInput: { 
        alignSelf: 'center', 
        borderWidth: 1, 
        borderColor: '#000', 
        marginTop: 20, 
        borderRadius: 5, 
        width: '90%', 
        paddingLeft: 10, 
        paddingVertical: 15
    },
    taskButton: {
        backgroundColor: theme.mainColor,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        marginTop: 20
    },
    taskButtonText: {
        fontWeight: 'bold',
        color: theme.secondaryColor
    },
    formStatusPicker:  {
        alignSelf: 'center',
        marginTop: 20,
        width: '90%',
        paddingLeft: 10,
    },
    formButton : {
        backgroundColor: theme.secondaryColor,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15, 
        marginTop: 20
    },
    formButtonText: {
        fontWeight: 'bold',
        color: theme.mainColor
    },
});

export default Task;