import React from 'react'
import _ from "lodash";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchNews, fetchArticle} from '../actions/index'
import NewsDelete from './NewsDelete'
import '../styles/article.css'

class NewsList extends React.Component{
    state = {
        showPopup: false
    };

    truncate = (elem, limit, after) => {
        if (!elem || !limit) return;
        var content = elem.trim();
        content = content.split(' ').slice(0, limit);
        content = content.join(' ') + (after ? after : '');
        elem = content;
        return elem;
    };

    showPopup = (articleId) => {
        this.setState({
            showPopup: true,
            articleId: articleId
        });

        console.log(articleId)
    };
    closePopup = () => {
        this.setState({
            showPopup: false
        })
    };

    componentDidMount() {
        this.props.fetchNews();
    }

    renderNews() {
        const { news } = this.props;
        const allNews = _.map(news, (value, key) => {
            return (
                <div key={key}>
                    <div className="article-content">
                        {
                            this.props.userId === value.userId ?
                                <div className="art-buttons">
                                    <Link to={`/news/${value.articleId}/edit`}>
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                    <button onClick={() => this.showPopup(value.articleId)}>
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>
                                :
                                null
                        }
                        <h4>
                            <Link to={`/news/${value.articleId}`}>{value.title}</Link>
                        </h4>
                        <div className="article-author">
                            <h6>{value.userName}  <span>{value.timestamp}</span></h6>
                        </div>
                        <p>{this.truncate(value.content, 50, '...')}</p>
                    </div>
                </div>
            );
        });
        if (!_.isEmpty(allNews)) {
            return allNews;
        }
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {this.renderNews()}
                        {this.state.showPopup &&
                            <NewsDelete articleId={this.state.articleId} closePopup={this.closePopup}/>
                        }
                    </div>
                </div>
                {this.props.isSignedIn &&
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/news/create" className="btn btn-info">Create news</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.user.userId
    };
};
export default connect(mapStateToProps, {fetchNews, fetchArticle})(NewsList)