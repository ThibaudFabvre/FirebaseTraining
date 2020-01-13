import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight , ScrollView}  from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getNews } from '../api/newsList';
import { NewsList } from '.';

const newsTypes = [{title: 'personal'}, {title: 'local'}, { title: 'world wide'}];

const News = ({ navigation }) => {
    const [activeNewsType, setActiveNewsType] = useState('personal');
    const [newsList, setNewsList ] = useState({highlightedNewsList: [], defaultNewsList: []});
    const getNewsList = async () => {
        const results = await getNews(activeNewsType);
        setNewsList(results);
    };

    useFocusEffect(
        useCallback(() => {
        try {
            getNewsList();
            console.log('successfuly retrieved the news list')
        } catch {
            console.log('error while trying to fetch news list');
        }
    },[activeNewsType]));

    return (
        <View style={{flex: 1}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee'}}>
                {newsTypes.map(
                    type => (
                        <TouchableHighlight onPress={() => setActiveNewsType(type.title)} style={{ 
                            alignSelf: 'center', 
                            marginVertical: 10, 
                            padding: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.44,
                            shadowRadius: 10.32,
                            elevation: 16,
                            backgroundColor: '#fff',
                            width: '25%',
                            borderRadius: 25
                        }}>
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{type.title}</Text>
                        </TouchableHighlight>
                    )
                )}
            </View>
            <NewsList navigation={navigation} list={newsList} getNewsList={getNewsList}/>
        </View>
    );
};


export default News;