import database from '@react-native-firebase/database';

const taskListRef = database().ref('TasksList/');

export const getTasksList = async () => {
    const tasksList = [];
    const results = await taskListRef.once('value');
    results.forEach(task => {
        const title = task.child('title').val();
        const resume = task.child('resume').val();
        const status = task.child('status').val();
        tasksList.push({
            title: title,
            resume: resume,
            status: status
        })
    })
    return tasksList;
};

export const addTaskToDatabase = (title, resume, status) => {
        taskListRef.push().set({ title, resume, status});
}