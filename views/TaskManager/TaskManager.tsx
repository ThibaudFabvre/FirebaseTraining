import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet }  from 'react-native';
import { getTasksList } from '../../api/tasklist';
import { TaskList, AddTaskForm } from '../';
import { theme } from '../../theme';


const TaskManager: React.FC = () => {

    const [tasksList , setTasksList] = useState([{}]);
    const toDoList= tasksList.filter(element => element.status === 'to do');
    const inProgressList = tasksList.filter( element => element.status === 'in progress')
    const doneList = tasksList.filter(element => element.status === 'done')

    const reloadTasksList = async () => {
        const tasksList = await getTasksList();
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
        const getTasks = async () => {
            await reloadTasksList();
        };
        try {
            getTasks();
        } catch {
            console.log('error in fetching tasks list');
        }
    },[]);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.overallStyle}>
                <TaskList reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={toDoList} color={theme.toDoColor}/>
                <TaskList reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={inProgressList} color={theme.inProgressColor}/>
                <TaskList reloadTasksList={reloadTasksList} deleteTaskFromList={deleteTaskFromList} list={doneList} color={theme.doneColor}/>
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