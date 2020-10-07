import React, {useState} from 'react'
import {connect} from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


const SignIn = ({signIn, authError, auth}) => {

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    if(!auth.isLoaded)
        return null

    if(auth.uid)
        return <Redirect to='/'/>

    const handleChange = e =>{
        e.persist()
        setState(prev=>({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(state)
        signIn(state)
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                        Login
                    </button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p>: null}
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state=>({
    authError: state.auth.authError,
    auth: state.firebase.auth
})

const mapDispatchToProps = ({
    signIn
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
