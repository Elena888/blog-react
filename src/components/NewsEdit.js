import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {editArticle, deleteArticle, createArticle, fetchArticle} from "../actions";
import FormArticle from './formArticle'
import {filter, validate} from '../inc/functions'

class NewsEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.article.title,
            content: this.props.article.content,
            userName: this.props.name,
            userId: this.props.userId,
            timestamp: new Date(Date.now()).toLocaleString(),
            articleId: this.props.article.articleId,
            formErrors: [],
            submitMessage: ''
        };
        console.log('Constructor', this.state)
    }
    componentDidMount(){
        this.props.fetchArticle(this.props.match.params.id);
        console.log('componentDidMount', this.state)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.article !== this.props.article) {
            const {title, content, articleId} = this.props.article;
            this.setState({
                title,
                content,
                articleId
            })
        }
        console.log('componentDidUpdate', this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, content } = this.state;

        const formErrors = validate(title, content);

        if (Object.keys(formErrors).length > 0) {
            this.setState({
                formErrors,
                submitMessage: ''
            });
            return;
        }else{
            this.setState({
                formErrors: [],
                submitMessage: 'You successfully edited article'
            });
        }
        let newsData = {
            title: this.state.title,
            content: this.state.content,
            userName: this.state.userName,
            userId: this.state.userId,
            timestamp: this.state.timestamp,
            articleId: this.state.articleId
        };

        if(this.props.article.title === title){
            this.props.editArticle(newsData.articleId, newsData)

        }else{
            this.props.deleteArticle(this.props.article.articleId);
            this.props.createArticle(newsData.articleId, newsData);
            history.push(`/news/${newsData.articleId}/edit`)
        }

        console.log('handleSubmit', this.state)
    };

    handleChangeTitle = (event) => {
        const value = event.target.value;
        let generateId = value.split(' ');
        generateId = filter(generateId);
        generateId = generateId.join('-') + '-' + Math.random().toString(36).substr(2, 5)
        this.setState({
            title: value,
            articleId: generateId
        });
        console.log('handleChangeTitle',this.state)
    };
    handleChangeContent = (event) => {
        const value = event.target.value;
        this.setState({
            content: value,
            timestamp: new Date(Date.now()).toLocaleString(),
            userName: this.props.name,
            userId: this.props.userId
        });
        console.log('handleChangeContent',this.state)
    };
    render(){
        if(!this.props.article){
            return <div>Loading...</div>
        }
        console.log('render',this.state)
        return(
            <React.Fragment>
            <FormArticle
                title={this.state.title}
                content={this.state.content}
                formErrors={this.state.formErrors}
                handleSubmit={this.handleSubmit}
                handleChangeContent={this.handleChangeContent}
                handleChangeTitle={this.handleChangeTitle}
            />
                {this.state.submitMessage &&
                    <div className="container">
                        <div className="row" style={{marginTop: '30px'}}>
                            <h5 className="alert alert-success">{this.state.submitMessage}</h5>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return{
        article: state.article,
        name: state.auth.user.name,
        userId: state.auth.user.userId
    }
};

export default connect(mapStateToProps, {editArticle, deleteArticle, createArticle, fetchArticle})(NewsEdit)