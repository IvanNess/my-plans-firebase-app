import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = ({signOut, profile})=>{
    return(
        <ul className="right">
            <li><NavLink to={`/create`}>New Project</NavLink></li>
            <li><NavLink to={`/`} onClick={signOut}>Log Out</NavLink></li>
            <li><NavLink to={`/`} className='btn btn-floating pink lighten-1'>{profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = ({
    signOut
})

export default connect(null, mapDispatchToProps)(SignedInLinks)