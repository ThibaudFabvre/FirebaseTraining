import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight , ScrollView}  from 'react-native';

import { NewsCard } from '.';
import { deleteNewsFromDatabase, getNews } from '../api/newsList';

const NewsList = ({ list, navigation, getNewsList}) => {

    const handleDeletion = (id, category, type) => {
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
            <View style={styles.sectionWrapper}>
                <Text style={styles.centeredWrapper}>Main news</Text>
                <TouchableHighlight style={[styles.centeredButton, styles.centeredButtonWrapper]} onPress={() => navigation.navigate('AddNewsForm') }>
                    <Text styles={styles.centeredText}>+</Text>
                </TouchableHighlight>
            </View>
            <View>
                {list.highlightedNewsList.map(highlightedNews => {
                        const highlightedNewsDetailsProps = { id: highlightedNews.id, type: highlightedNews.type, title: highlightedNews.title, resume: highlightedNews.resume, details: highlightedNews.details, imageUrl: highlightedNews.image, navigation: navigation, category: highlightedNews.category };
                        return (
                            <View style={styles.newsWrapper}>
                                <TouchableHighlight style={styles.highlightednewsWrapper} onPress={() => navigation.navigate('NewsDetails', highlightedNewsDetailsProps)}>
                                    <Text style={styles.highlightedNewsResume}>- {highlightedNews.resume}</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.deleteButton} onPress={() => handleDeletion(highlightedNews.id, highlightedNews.category, '/highlights')}>
                                    <Text style={styles.centeredText}>X</Text>
                                </TouchableHighlight>
                            </View>
                        )}
                )}
            </View>
            <View style={styles.sectionWrapper}>
                <Text style={styles.centeredWrapper}>Daily news</Text>
                <TouchableHighlight style={[styles.centeredButton, styles.centeredButtonWrapper]} onPress={() => navigation.navigate('AddNewsForm') }>
                    <Text>+</Text>
                </TouchableHighlight>
            </View>
            {list.defaultNewsList.map(news=>
                <>
                    <NewsCard id={news.id} type='News' details={news.details} category={news.category} title={news.title} resume={news.resume} imageUrl={news.image} navigation={navigation}/>
                    <TouchableHighlight style={styles.deleteButton} onPress={() => handleDeletion(news.id, news.category, '/News')}>
                        <Text style={[styles.centeredText, styles.lastElement]}>X</Text>
                    </TouchableHighlight>
                </>
            )}
        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    centeredButtonWrapper: { paddingVertical: 6, paddingHorizontal: 10 },
    centeredButton: { borderRadius: 25, alignSelf: 'center', backgroundColor: '#ddd'},
    centeredWrapper: { marginTop: 10, padding: 10, textAlign: 'center', fontWeight: 'bold'},
    centeredText: { alignSelf: 'center', justifyContent: 'center'},
    deleteButton: { marginTop: 10, marginLeft: 10, alignSelf: 'center'}, 
    newsWrapper: {flexDirection: 'row', justifyContent: 'center'},
    sectionWrapper: { marginTop: 10, padding: 10},
    highlightednewsWrapper: { alignSelf: 'center', width: '80%', padding: 8, marginTop: 15, marginBottom: 10, borderRadius: 25, backgroundColor: '#eee', borderWidth: 2, borderColor: '#ddd'},
    highlightedNewsResume: {fontWeight: 'bold'},
    lastElement: { marginBottom: 20},
})

export default NewsList;
