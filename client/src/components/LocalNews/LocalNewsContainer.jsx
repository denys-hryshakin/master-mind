import React from 'react'
import { connect } from 'react-redux'
import { newsAPI, profileAPI } from '../../redux/actions/actions'
import { getNews } from '../../redux/reducers/news-reducer'
import LocalNews from './LocalNews'
import { setUserProfile } from '../../redux/reducers/profile-reducer'

class LocalNewsContainer extends React.Component {
    state = {
        isLocal: false
    }
    componentDidMount() {
        profileAPI.getProfile(this.props.userId)
            .then(data => {
                this.props.setUserProfile(data.profile);
            });
        this.props.getNews()
    }

    render() {
        return (
            <div className="container-block">
                <LocalNews
                    {...this.props}
                    state={this.state}
                    news={this.props.news}
                    profile={this.props.profile} />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    news: state.newsPage,
    profile: state.profilePage.profile,
    userId: state.login.user.id
})

export default connect(mapStateToProps, { newsAPI, getNews, setUserProfile })(LocalNewsContainer);