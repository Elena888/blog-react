import React from 'react'
import {connect} from 'react-redux'
import {createArticle} from '../actions/index'
import FormArticle from './formArticle'
import {filter, validate} from '../inc/functions'

class NewsCreate extends React.Component{
    state = {
        title: '',
        content: '',
        userName: null,
        userId: null,
        timestamp: null,
        articleId: null,
        formErrors: []
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, content } = this.state;

        const formErrors = validate(title, content);

        if (Object.keys(formErrors).length > 0) {
            this.setState({formErrors});
            return;
        }
        let newsData = {
            title: this.state.title,
            content: this.state.content,
            userName: this.state.userName,
            userId: this.state.userId,
            timestamp: this.state.timestamp,
            articleId: this.state.articleId
        };
        this.props.createArticle(newsData.articleId, newsData)
    };

    handleChangeTitle = (event) => {
        const value = event.target.value;
        let generateId = value.split(' ');
        generateId = filter(generateId);
        generateId = generateId.join('-') + '-' + Math.random().toString(36).substr(2, 5)
        this.setState({
            title: value,
            articleId: generateId
        })
    };
    handleChangeContent = (event) => {
        const value = event.target.value;
        this.setState({
            content: value,
            //Can I add here this states????????????????????????????
            timestamp: new Date(Date.now()).toLocaleString(),
            userName: this.props.name,
            userId: this.props.userId
        });
    };
    render(){
        return(
            <FormArticle
                title={this.state.title}
                content={this.state.content}
                formErrors={this.state.formErrors}
                handleSubmit={this.handleSubmit}
                handleChangeContent={this.handleChangeContent}
                handleChangeTitle={this.handleChangeTitle}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isSignIn: state.auth.isSignedIn,
        name: state.auth.user.name,
        userId: state.auth.user.userId
    }
};
export default connect(mapStateToProps, {createArticle})(NewsCreate)