import React from 'react'
import {connect} from 'react-redux'
import {editArticle, fetchArticle} from "../actions";
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
            console.log('arr[i]', arr[i])
            //console.log('symbols[i]', symbols[i])
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
            userName: this.props.article.userName,
            timestamp: this.props.article.timestamp,
            articleId: this.props.article.articleId,
            formErrors: []
        };
    }
    componentDidMount(){
        this.props.fetchArticle(this.props.match.params.id)
        console.log("NEW STATE", this.state)
    }

    componentDidUpdate(prevProps) {
        console.log('prebstate', this.props.article.title)
       /* if(prevProps.article.articleId.title !== this.props.article.title) {
            this.setState({
                title: this.props.article.title
            })
        }*/
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state.formErrors);
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
        this.props.editArticle(newsData.articleId, newsData)
    };

    handleChangeTitle = (event) => {
        const value = event.target.value;
        let generateId = value.split(' ');
        generateId = filter(generateId);
        generateId = generateId.join('-') + '-' + Math.random().toString(36).substr(2, 5)

        console.log(generateId)
        this.setState({
            title: value,
            articleId: generateId
        })
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
        console.log('props', this.props.article)
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
    console.log('STATE', state.news)
    return{
        article: state.news
    }
};

export default connect(mapStateToProps, {editArticle, fetchArticle})(NewsEdit)