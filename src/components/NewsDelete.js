import React from 'react'
import {connect} from 'react-redux'
import {fetchArticle, deleteArticle} from '../actions'
import '../styles/popup.css'

class NewsDelete extends React.Component{
    componentDidMount(){
        this.props.fetchArticle(this.props.articleId)
    }

    handleClick = () => {
        this.props.deleteArticle(this.props.articleId);
        this.props.closePopup()
    };

    render(){
        return(
            <div className="popup" onClick={this.props.closePopup}>
                <div className="popup_inner" onClick={e => e.stopPropagation()}>
                    <h2>Are you sure you want delete article "{this.props.article.title}" ?</h2>
                    <div className="popup-btns">
                        <button onClick={this.handleClick} className="btn btn-danger">Yes</button>
                        <button onClick={this.props.closePopup} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        article: state.article
    }
};

export default connect(mapStateToProps, {fetchArticle, deleteArticle})(NewsDelete)