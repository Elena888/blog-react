import React from 'react'
import {connect} from 'react-redux'
import {Sign_In, Sign_Out} from "../actions";

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '800349884195-mdcrrsnnpvr1lh9m2immqmtgsc81nvph.apps.googleusercontent.com',
                scope: 'profile email'
            })
            .then(
                () => {
                    this.googleAuth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.googleAuth.isSignedIn.get());
                    this.googleAuth.isSignedIn.listen(this.onAuthChange)
                },
                () => {
                    console.log('err')
                }
            );
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            const  GoogleUser = this.googleAuth.currentUser.get();
            const basicProfile = GoogleUser.getBasicProfile();
            const user = {};
            user.name = basicProfile.getGivenName();
            user.userId = basicProfile.getId();

            this.props.Sign_In(user)
        }else{
            this.props.Sign_Out()
        }
    };

    signIn = () => {
        this.googleAuth.signIn()
    };

    signOut = () => {
        this.googleAuth.signOut()
    };

    renderButtons = () => {
        if(this.props.isSignedIn === null){
            return null
        }else if(this.props.isSignedIn){
            return(
                <button type="button" className="btn btn-danger" onClick={this.signOut}>
                    <i className="fab fa-google-plus-g"></i> Sign Out | {this.props.name}
                </button>
            )
        }else{
            return(
                <button type="button" className="btn btn-danger" onClick={this.signIn}>
                    <i className="fab fa-google-plus-g"></i> Sign In
                </button>
            )
        }
    };

    render(){
        return(
            <div>
                {this.renderButtons()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.user.name
    }
};

export default connect(mapStateToProps, {Sign_In, Sign_Out})(GoogleAuth)