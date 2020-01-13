import React, { useState } from 'react';
import { View, TextInput, Picker, TouchableHighlight, Text } from 'react-native';
import { addNewsToDatabase } from '../api/newsList';

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
        <View style={{flex: 1, justifyContent: 'space-around'}}>
            <TextInput style={{ alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'}} onChangeText={inputValue => setNewsTitle(inputValue)} placeholder='title'/>
            <TextInput style={{ alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'}} onChangeText={inputValue => setNewsResume(inputValue)} placeholder='resume'/>
            <TextInput style={{ alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'}} onChangeText={inputValue => setNewsImageUrl(inputValue)} placeholder='image url'/>
            <TextInput style={{ alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'}} onChangeText={inputValue => setNewsDetails(inputValue)} placeholder='details'/>
            <Picker
                selectedValue={type}
                style={{ width: '80%', alignSelf: 'center'}}
                onValueChange={(type) =>
                    setNewsType(type)
                }>
                    <Picker.Item label="Select news type" value={0}/>
                    <Picker.Item label="Highlighted news" value="Highlighted news" />
                    <Picker.Item label="Default news" value="Default news" />
            </Picker>
            <Picker
                selectedValue={category}
                style={{ width: '80%', alignSelf: 'center'}}
                onValueChange={(category) =>
                    setNewsCategory(category)
                }>
                    <Picker.Item label="Select news category" value={0}/>
                    <Picker.Item label="personal" value="personal" />
                    <Picker.Item label="local" value="local" />
                    <Picker.Item label="world wide" value="world wide" />
            </Picker>
            <TouchableHighlight style={{backgroundColor: '#000', width: '80%', alignSelf: 'center', borderRadius: 10, borderWidth: 3}} onPress={() => addNews()}>
                <Text style={{textAlign: 'center', padding: 10, color: '#fff', fontWeight: 'bold'}}> Add News </Text>
            </TouchableHighlight>
        </View>
    );
};


export default AddNewsForm;