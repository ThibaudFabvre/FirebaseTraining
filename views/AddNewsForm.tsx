import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Picker, TouchableHighlight,Text } from 'react-native';
import { addNewsToDatabase } from '../api/newsList';
import { SquareButton } from '.';

const AddNewsForm = ({ navigation }) => {
    const [ title , setNewsTitle ] = useState();
    const [ resume, setNewsResume ] = useState();
    const [ img, setNewsImageUrl] = useState();
    const [ details, setNewsDetails ] = useState();
    const [ category, setNewsCategory ] = useState();
    const [ type, setNewsType ] = useState();

    const addNews = () => {
        const newsToAdd = { title, resume, img, details, category }
        try {
            addNewsToDatabase(newsToAdd, type, category);
            console.log('added news to databse');
            navigation.goBack();
        } catch {
            console.log('could not add task to database');
        }
    }

    return (
        <View style={styles.addNewsWrapper}>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsTitle(inputValue)} placeholder='title'/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsResume(inputValue)} placeholder='resume'/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsImageUrl(inputValue)} placeholder='image url'/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsDetails(inputValue)} placeholder='details'/>
            <Picker
                selectedValue={type}
                style={styles.picker}
                onValueChange={(type) =>
                    setNewsType(type)
                }>
                    <Picker.Item label="Select news type" value={0}/>
                    <Picker.Item label="Highlighted news" value="Highlighted news" />
                    <Picker.Item label="Default news" value="Default news" />
            </Picker>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(category) =>
                    setNewsCategory(category)
                }>
                    <Picker.Item label="Select news category" value={0}/>
                    <Picker.Item label="personal" value="personal" />
                    <Picker.Item label="local" value="local" />
                    <Picker.Item label="world wide" value="world wide" />
            </Picker>
            <SquareButton text='Add News' action={() => addNews()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: { alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'},
    picker: { width: '80%', alignSelf: 'center'},
    addNewsWrapper: {flex: 1, justifyContent: 'space-around'},
})

export default AddNewsForm;