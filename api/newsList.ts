import database from '@react-native-firebase/database';


export const getNews = async (type) => {
    const defaultNewsList = [];
    const highlightedNewsList = [];
    const defaultNewsListRef = database().ref('News/' + type + '/News');
    const highlightedNewsListRef = database().ref('News/' + type + '/highlights');
    const defaultNews = await defaultNewsListRef.once('value');
    const highlightedNews = await highlightedNewsListRef.once('value');
    defaultNews.forEach(news => {
        const title = news.child('title').val();
        const resume = news.child('resume').val();
        const details = news.child('details').val();
        const img = news.child('img').val();
        const id = news.key;
        defaultNewsList.push({
            id: id,
            title: title,
            resume: resume,
            image: img,
            details: details
        })
    });
    highlightedNews.forEach(news => {
        const title = news.child('title').val();
        const resume = news.child('resume').val();
        const details = news.child('details').val();
        const img = news.child('img').val();
        const category = news.child('category').val();
        const id = news.key;
        highlightedNewsList.push({
            id: id,
            title: title,
            resume: resume,
            image: img,
            details: details,
            category: category,
        })
    })
    const formatedResult = { 
        highlightedNewsList,
        defaultNewsList
    };
    return formatedResult;
};

export const addNewsToDatabase = (news, newsType, newsCategory) => {
    const type = newsType === 'Highlighted news' ? '/highlights' : '/News';
    const newsListRef = database().ref('News/' + newsCategory + type );
    newsListRef.push().set(news);
}

export const deleteNewsFromDatabase = (newsId, newsCategory, type) => {
    const newsListRef = database().ref('News/' + newsCategory + type );
    newsListRef.child(newsId).remove();
} 

export const updateNewsInDatabase = (newsId, newNewsData, newsCategory, newsType ) => {
    const newsListRef = database().ref('News/' + newsCategory + newsType );
    console.log(newNewsData.resume);
    console.log(newsCategory)
    console.log(newsType);
    newsListRef.child(newsId).set({
        title: newNewsData.title,
        img: newNewsData.imageUrl,
        resume: newNewsData.resume,
        details: newNewsData.details,
        category: newNewsData.category,
        type: newNewsData.type,
    })
}