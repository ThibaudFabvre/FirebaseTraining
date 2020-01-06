import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet }  from 'react-native';
import { getTasksList } from '../api/tasklist';
import { List, AddTaskForm } from '.';


const TaskManager: React.FC = () => {

    const [tasksList , setTasksList] = useState([{}]);
    const toDoList= tasksList.filter(element => element.status === 'to do');
    const inProgressList = tasksList.filter( element => element.status === 'in progress')
    const doneList = tasksList.filter(element => element.status === 'done')

    const reloadTasksList = async () => {
        const tasksList = await getTasksList();
        console.log(tasksList);
        console.log('successfully retrieved task list');
        setTasksList(tasksList);
    }

    const deleteTask = (id) => {
        try {
            const newList = tasksList.filter(task => task.id !== id);
            setTasksList(newList);
            console.log('successfully delete task from list');
        } catch {
            console.log('could not delete task from list');
        }
    }

    const addTaskToList = (task) => {
        setTasksList(tasksList.concat(task));
        reloadTasksList();
    }
    
    const deleteTaskFromList = (taskId) => {
        deleteTask(taskId);
        reloadTasksList();
    }

    useEffect(() => {
        const newFunc = async () => {
            await reloadTasksList();
        };
        try {
            newFunc();
        } catch {
            'error in fetching tasks list'
        }
    },[]);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.overallStyle}>
                <List reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={toDoList} color={'#87CEEB'}/>
                <List reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={inProgressList} color={'#FF7F00'}/>
                <List reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={doneList} color={'#BFFF00'}/>
            </ScrollView>
            <AddTaskForm addTaskToList={addTaskToList} />
        </View>
    )
};

const styles = StyleSheet.create({
    overallStyle: {
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
        justifyContent: 'space-around',
    },
});

export default TaskManager;