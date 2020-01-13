import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight , ScrollView}  from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getNews } from '../../api/newsList';
import { NewsList } from '..';

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
        },[activeNewsType])
    );

    return (
        <View style={styles.newsWrapper}>
            <View style={styles.navbar}>
                {newsTypes.map(
                    type => (
                        <TouchableHighlight onPress={() => setActiveNewsType(type.title)} style={styles.navBarItem}>
                            <Text style={styles.centeredText}>{type.title}</Text>
                        </TouchableHighlight>
                    )
                )}
            </View>
            <NewsList navigation={navigation} list={newsList} getNewsList={getNewsList}/>
        </View>
    );
};

const styles = StyleSheet.create({
    newsWrapper: {
        flex: 1,
    },
    navBarItem: {
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
    },
    centeredText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    navbar: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eee'
    },
});


export default News;