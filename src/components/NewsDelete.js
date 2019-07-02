import React from 'react'
import {connect} from 'react-redux'
import {fetchArticle, deleteArticle} from '../actions'
import history from '../history'
import '../styles/popup.css'

class NewsDelete extends React.Component{

    handleClick = () => {
      this.props.deleteArticle(this.props.articleId)
        history.push('/')
    };
    render(){
        console.log(this.props)
        return(
            <div className="popup">
                <div className="popup_inner">
                    <h2>Are you sure you want delete article "{this.props.article.title}" ?</h2>
                    <button onClick={this.handleClick} className="btn btn-danger">Yes</button>
                    <button onClick={this.props.closePopup} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps', state.article)
    return {
        article: state.article
    }
};

export default connect(mapStateToProps, {fetchArticle, deleteArticle})(NewsDelete)