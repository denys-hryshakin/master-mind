import React from 'react'
import { connect } from 'react-redux'
import { newsAPI } from '../../redux/actions/actions'
import { getNews } from '../../redux/reducers/news-reducer'
import LocalNews from './LocalNews'

class LocalNewsContainer extends React.Component {
    componentDidMount() {
        this.props.getNews()
    }
    render() {
        return (
            <div className="container-block">
                <LocalNews
                    {...this.props}
                    news={this.props.news} />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    news: state.newsPage,
})

export default connect(mapStateToProps, { newsAPI, getNews })(LocalNewsContainer);