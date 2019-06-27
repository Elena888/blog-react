import React from 'react'
import '../styles/form.css'

class formArticle extends React.Component{
    render(){
        const { title, content, handleChangeContent, handleChangeTitle, handleSubmit, formErrors } = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    name="title"
                                    data-title={title}
                                    onChange={handleChangeTitle}
                                    value={title}
                                />
                                <p className="form-error">{formErrors.title}</p>
                            </div>
                            <div className="form-group">
                               <textarea
                                   className="form-control"
                                   placeholder="Content"
                                   name="content"
                                   onChange={handleChangeContent}
                                   value={content}
                               />
                                <p className="form-error">{formErrors.content}</p>
                            </div>
                            <button type="submit" className="btn btn-info">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default formArticle