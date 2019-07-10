import React from 'react'
import {connect} from 'react-redux'
import {createArticle} from '../actions/index'
import FormArticle from './formArticle'
import {filter, validate} from '../inc/functions'

class NewsCreate extends React.Component{
    state = {
        title: '',
        content: '',
        formErrors: []
    };

    articleId = '';

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
            articleId: this.articleId
        };
        this.props.createArticle(newsData.articleId, newsData)
    };

    handleChangeTitle = (event) => {
        const value = event.target.value;
        let generateId = value.split(' ');
        generateId = filter(generateId);
        this.articleId = generateId.join('-') + '-' + Math.random().toString(36).substr(2, 5)
        this.setState({
            title: value
        })
    };
    handleChangeContent = (event) => {
        const value = event.target.value;
        this.setState({
            content: value
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

export default connect(null, {createArticle})(NewsCreate)