import React from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import NewsCreate from './components/NewsCreate'
import NewsEdit from './components/NewsEdit'
import NewsList from './components/NewsList'
import NewsShow from './components/NewsShow'
import Header from './components/Header'
import {connect} from 'react-redux'
import history from './history'

class App extends React.Component{
    render(){
        let routes = (
            <Switch>
                <Route path='/' exact component={NewsList}/>
                <Route path='/news/:id' exact component={NewsShow}/>
                <Redirect to="/"/>
            </Switch>
        );
        if(this.props.isSignIn){
            routes = (
                <Switch>
                    <Route path='/' exact component={NewsList}/>
                    <Route path='/news/create' exact component={NewsCreate}/>
                    <Route path='/news/:id' exact component={NewsShow}/>
                    <Route path='/news/:id/edit' exact component={NewsEdit}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }

        return (
            <div>
                <Router history={history}>
                    <Header/>
                    <div className="inner-content">
                        {routes}
                    </div>
                </Router>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isSignIn: state.auth.isSignedIn
    }
};
export default connect(mapStateToProps)(App)