import React from 'react'
import {connect} from 'react-redux'
import {fetchArticle} from '../actions/index'

class NewsShow extends React.Component{
    componentDidMount(){
        this.props.fetchArticle(this.props.match.params.id)
    }
    render(){
        if(!this.props.article){
            return <div>Loading...</div>
        }
        const {title, content, userName, timestamp} =  this.props.article
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="article-content">
                            <h1>{title}</h1>
                            <div className="article-author">
                                <h6>{userName}  <span>{timestamp}</span></h6>
                            </div>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        article: state.article
    }
};

export default connect(mapStateToProps, {fetchArticle})(NewsShow)