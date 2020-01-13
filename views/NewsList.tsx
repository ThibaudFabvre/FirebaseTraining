import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight , ScrollView}  from 'react-native';

import { NewsCard } from '.';
import { deleteNewsFromDatabase, getNews } from '../api/newsList';

const NewsList = ({ list, navigation, getNewsList}) => {

    const handleDeletion = (id, category, type) => {
        console.log(category);
        try {
            deleteNewsFromDatabase(id, category, type);
            getNewsList();
            console.log('successfuly deleted news from database');
        } catch {
            console.log('failed to delete news from database');
        }
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}>
            <View style={{ marginTop: 10, padding: 10}}>
                <Text style={{ marginTop: 10, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>Main news</Text>
                <TouchableHighlight style={{borderRadius: 25, alignSelf: 'center', backgroundColor: '#ddd', paddingVertical: 5, paddingHorizontal: 10}} onPress={() => navigation.navigate('AddNewsForm') }>
                    <Text>+</Text>
                </TouchableHighlight>
            </View>
            <View>
                {list.highlightedNewsList.map(highlightedNews =>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableHighlight style={{alignSelf: 'center', width: '80%', padding: 8, marginTop: 15, marginBottom: 10, borderRadius: 25, backgroundColor: '#eee', borderWidth: 2, borderColor: '#ddd'}}>
                            <Text style={{fontWeight: 'bold'}}> > {highlightedNews.resume}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{marginLeft: 20, alignSelf: 'center'}} onPress={() => handleDeletion(highlightedNews.id, highlightedNews.category, '/highlights')}>
                            <Text style={{alignSelf: 'center', justifyContent: 'center'}}>X</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </View>
            <View style={{ marginTop: 10, padding: 10}}>
                <Text style={{ marginTop: 10, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>Daily news</Text>
                <TouchableHighlight style={{borderRadius: 25, alignSelf: 'center', backgroundColor: '#ddd', paddingVertical: 5, paddingHorizontal: 10}} onPress={() => navigation.navigate('AddNewsForm') }>
                    <Text>+</Text>
                </TouchableHighlight>
            </View>
            {list.defaultNewsList.map(news=>
                <>
                    <NewsCard id={news.id} type='default' details={news.details} category='personal' title={news.title} resume={news.resume} imageUrl={news.image} navigation={navigation}/>
                    <TouchableHighlight style={{marginLeft: 20, alignSelf: 'center'}} onPress={() => handleDeletion(news.id, news.category, '/News')}>
                        <Text style={{alignSelf: 'center', justifyContent: 'center'}}>X</Text>
                    </TouchableHighlight>
                </>
            )}
        </ScrollView>
    );
} 

export default NewsList;
