import React from 'react'
import NewsItem from './NewsItem/NewsItem'
import './LocalNews.css'

const LocalNews = (props) => {
    let newsElements = props.news.news.map(n => <NewsItem key={n.id} news={n} profile={props.profile} isLocal={props.state.isLocal} />);
    return (
        <div className="container-block">
            <div className="newsBlock">
                {newsElements}
            </div>
        </div>
    );
}

export default LocalNews;