import React from 'react'
import GoogleAuth from './GoogleAuth'
import {Link} from 'react-router-dom'
import '../styles/style.css'

const Header = ()  => {
    return(
        <div className="header">
            <div className="container ">
                <div className="row d-flex align-items-center d-flex">
                    <div className="col-sm-8">
                        <Link to="/">News</Link>
                    </div>
                    <div className="col-sm-4 text-right">
                        <GoogleAuth/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header