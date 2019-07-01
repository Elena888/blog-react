import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {editArticle, deleteArticle, fetchArticle} from "../actions";
import FormArticle from './formArticle'

function validate(title, content) {
    // we are going to store errors for all fields
    // in a single array
    const errors = [];
    if (title.length === 0) {
        errors.title = 'Title can\'t be empty';
    }

    if (content.length < 6) {
        errors.content = 'Content should be at least 6 characters long'
    }
    return errors;
}
function filter(arr) {

    for(var i = 0; i < arr.length; i++){

        var symbols =  ["." , "#" , "$" , "[" , "]"]
        for(var j = 0; j < symbols.length; j++){
            if(arr[i] === symbols[j]){
                arr.splice(i, 1);
                i--;
            }
        }
    }
    return arr
}
class NewsEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: this.props.article.title,
            content: this.props.article.content,
            userName: this.props.name,
            timestamp: this.props.article.timestamp,
            articleId: this.props.article.articleId,
            formErrors: []
        };

    }
    componentDidMount(){
        this.props.fetchArticle(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.article.title !== this.props.article.title) {
            this.setState({
                title: this.props.article.title
            })
        }
        if(prevProps.article.content !== this.props.article.content) {
            this.setState({
                content: this.props.article.content
            })
        }
        if(prevProps.article.articleId !== this.props.article.articleId) {
            this.setState({
                articleId: this.props.article.articleId
            })
        }
        if(prevProps.article.timestamp !== this.props.article.timestamp) {
            this.setState({
                timestamp: this.props.article.timestamp
            })
        }
        /*if(prevProps.article.userName !== this.props.name) {
            this.setState({
                userName: this.props.name
            })
        }*/
    }

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
            timestamp: this.state.timestamp,
            articleId: this.state.articleId
        };
        //this.props.editArticle(newsData.articleId, newsData)

        if(this.props.article.title === title)
        {
            //console.log("handleSubmit this.props.article.title === title");
            this.props.editArticle(newsData.articleId, newsData )

        }
        else{//title is different
            //console.log("handleSubmit this.props.article.title !== title");
            this.props.deleteArticle(this.props.article.articleId)
            this.props.editArticle(newsData.articleId, newsData )
            history.push(`/news/${newsData.articleId}/edit`)
        }
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
        console.log('handleTitle',this.state.title)
    };
    handleChangeContent = (event) => {
        const value = event.target.value;
        this.setState({
            content: value,
            timestamp: new Date(Date.now()).toLocaleString(),
            userName: this.props.name
        });
    };
    render(){
        if(!this.props.article){
            return <div>Loading...</div>
        }
        console.log('render Title',this.state.title)
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
    return{
        article: state.article,
        name: state.auth.user.name
    }
};

export default connect(mapStateToProps, {editArticle, deleteArticle, fetchArticle})(NewsEdit)