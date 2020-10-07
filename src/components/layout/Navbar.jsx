import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar= (props)=>{
    const {auth, profile} = props

    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
    if(auth.isLoaded && !auth.uid && !document.location.pathname==='/signin')
        return <Redirect to={`/signin`}/>

    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to={`/`} className="brand-logo left">My Plan</Link>
                {auth.isLoaded && links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    //console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)