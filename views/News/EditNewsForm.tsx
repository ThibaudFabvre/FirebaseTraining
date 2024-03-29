import React, { useState } from 'react';
import { View, TextInput, Picker, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { updateNewsInDatabase, deleteNewsFromDatabase } from '../../api/newsList';
import { SquareButton } from '..';

const EditNewsForm = ({ route, navigation }) => {
    const { id, title, resume, details, type, category, imageUrl } = route.params;
    const [ newTitle , setNewsTitle ] = useState(undefined);
    const [ newResume, setNewsResume ] = useState(undefined);
    const [ newImageUrl, setNewsImageUrl] = useState(undefined);
    const [ newDetails, setNewsDetails ] = useState(undefined);
    const [ newCategory, setNewsCategory ] = useState(undefined);
    const [ newType, setNewsType ] = useState(undefined);

    const titleToRender = newTitle !== undefined ? newTitle : title ;
    const resumeToRender = newResume !== undefined ? newResume : resume;
    const imageToRender = newImageUrl !== undefined ? newImageUrl : imageUrl;
    const detailsToRender = newDetails !== undefined ? newDetails: details;
    const categoryToRender = newCategory !== undefined ? newCategory : category;
    const typeToRender = newType !== undefined ? newType : type;

    const updateNews = () => {
        const updatedData = { title: titleToRender, resume: resumeToRender, imageUrl: imageToRender, details: detailsToRender, category: categoryToRender, type: typeToRender };
        try {
            updateNewsInDatabase(id, updatedData, updatedData.category, updatedData.type);
            if(updatedData.type !== type) {
                deleteNewsFromDatabase(id, category, type)
            }
            console.log('successfuly updated news in database');
            navigation.navigate('NewsDetails', updatedData);
        } catch {
            console.log('failed to update news in database');
        }
    }
    return (
        <View style={styles.editNewsWrapper}>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsTitle(inputValue)} value={titleToRender}/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsResume(inputValue)} value={resumeToRender}/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsImageUrl(inputValue)} value={imageToRender}/>
            <TextInput style={styles.input} onChangeText={inputValue => setNewsDetails(inputValue)} value={detailsToRender}/>
            <Picker
                selectedValue={typeToRender}
                style={styles.picker}
                onValueChange={(type) =>
                    setNewsType(type)
                }>
                    <Picker.Item label="News" value="News" />
                    <Picker.Item label="highlights" value="highlights" />
            </Picker>
            <Picker
                selectedValue={categoryToRender}
                style={styles.picker}
                onValueChange={(category) =>
                    setNewsCategory(category)
                }>
                    <Picker.Item label="personal" value="personal" />
                    <Picker.Item label="local" value="local" />
                    <Picker.Item label="world wide" value="world wide" />
            </Picker>
            <SquareButton text='Update News' action={() => updateNews()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: { alignSelf: 'center', width: '80%', backgroundColor: '#fff', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#aaa'},
    picker: { width: '80%', alignSelf: 'center'},
    editNewsWrapper: {flex: 1, justifyContent: 'space-around'},
})

export default EditNewsForm;