import React from 'react'
import NewsItem from './NewsItem/NewsItem'

const LocalNews = (props) => {
    let newsElements = props.news.news.map(n => <NewsItem key={n.id} news={n} />);

    return (
        <div className="container-block">
            <div>
                {newsElements}
            </div>
        </div>
    );
}

export default LocalNews;