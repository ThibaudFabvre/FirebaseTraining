import React, { useState } from 'react';
import { StyleSheet,Picker,  View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import { deleteTaskFromList, updateTaskFromList } from '../api/tasklist';

interface Props {
    title: string,
    resume: string,
    id: number,
    deleteTask: void;
    reloadTasksList: void;
}

const Task: React.FC<Props> = ({ title, resume, id, deleteTask, reloadTasksList}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formTitle, setNewTitle] = useState('');
    const [formResume, setNewResume] = useState('');
    const [formStatus, setNewStatus] = useState();


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

    return (
        <View style={[styles.defaultCardStyle, { backgroundColor: `${isFormOpen ? '#882692' : '#fff'}`}]}>
            {!isFormOpen ?
                <>
                    <Text style={{backgroundColor: '#882692', fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: 10}}>{title}</Text>
                    <Text style={{ padding: 10 }}>{resume}</Text>
                </>
                :
                <>  
                    <TextInput style={{ backgroundColor: `${isFormOpen ? '#fff' : '#882692'}` ,alignSelf: 'center', borderWidth: 1, borderColor: '#000', marginTop: 20, borderRadius: 5, width: '90%', paddingLeft: 10, paddingVertical: 15 }} placeholder='new title' onChangeText={ input => setNewTitle(input)}/>
                    <TextInput style={{ backgroundColor: `${isFormOpen ? '#fff' : '#882692'}` ,alignSelf: 'center', borderWidth: 1, borderColor: '#000', marginTop: 20, borderRadius: 5, width: '90%', paddingLeft: 10, paddingVertical: 15 }} placeholder='new resume' onChangeText={ input => setNewResume(input)}/>
                    <Picker
                    selectedValue={formStatus}
                    style={{backgroundColor: `${isFormOpen ? '#fff' : '#882692'}`, alignSelf: 'center', marginTop: 20, width: '90%', paddingLeft: 10}}
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
                    <TouchableHighlight style={{backgroundColor: '#882692', borderRadius: 50, paddingHorizontal:20, paddingVertical: 15, marginBottom: 15, marginTop: 20}} onPress={() => setIsFormOpen(true)}><Text style={{fontWeight: 'bold', color: '#fff'}}>Edit</Text></TouchableHighlight>
                    <TouchableHighlight style={{backgroundColor: '#882692', borderRadius: 50, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 15, marginTop: 20}} onPress={() => handleDeletion()} ><Text style={{fontWeight: 'bold', color: '#fff'}}>Delete</Text></TouchableHighlight>
                </>
                :
                <>
                    <TouchableHighlight style={{backgroundColor: '#fff', borderRadius: 50, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 15, marginTop: 20}} onPress={() => handleValidation()} ><Text style={{fontWeight: 'bold', color: '#882692'}}>V</Text></TouchableHighlight>
                    <TouchableHighlight style={{backgroundColor: '#fff', borderRadius: 50, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 15, marginTop: 20}} onPress={() => handleCancel()} ><Text style={{fontWeight: 'bold', color: '#882692'}}>X</Text></TouchableHighlight>
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
        borderColor: '#882692',
        width: '80%',
        margin: 10,
        overflow: "hidden",
    },
});

export default Task;