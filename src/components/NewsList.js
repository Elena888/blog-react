import React from 'react'
import _ from "lodash";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchNews, fetchArticle} from '../actions/index'
import NewsDelete from './NewsDelete'
import '../styles/article.css'

class NewsList extends React.Component{
    truncate = (elem, limit, after) => {
        if (!elem || !limit) return;
        var content = elem.trim();
        content = content.split(' ').slice(0, limit);
        content = content.join(' ') + (after ? after : '');
        elem = content;
        return elem;
    };

    state = {
        showPopup: false
    };
    togglePopup = (articleId) => {
        this.setState({
            showPopup: !this.state.showPopup
        })
    };
    componentDidMount() {
        this.props.fetchNews();
    }

    renderNews() {
        console.log('Render')
        console.log('PROPS', this.props.news)
        console.log('State', this.state)
        const { news } = this.props;
        const allNews = _.map(news, (value, key) => {
            return (
                <div key={key}>
                    <div className="article-content">
                        <div className="art-buttons">
                            <Link to={`/news/${value.articleId}/edit`}>
                                <i className="fas fa-pen"></i>
                            </Link>
                            {/*<Link to={`/news/${value.articleId}/delete`}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </Link>*/}
                            <button onClick={() => this.togglePopup(value.articleId)}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>

                            {this.state.showPopup ?
                                <NewsDelete articleId={value.articleId}
                                            closePopup={() => this.togglePopup(value.articleId)}/>
                                :
                                null

                            }
                        </div>
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
        isSignedIn: state.auth.isSignedIn
    };
};
export default connect(mapStateToProps, {fetchNews, fetchArticle})(NewsList)