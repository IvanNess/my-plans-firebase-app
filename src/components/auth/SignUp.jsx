import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

const SignUp = ({auth, signUp, authError}) => {

    const [state, setState] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    })

    if(!auth.isLoaded)
        return null

    if(auth.uid)
        return <Redirect to={`/`}/>

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
        signUp(state)
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                        Signup
                    </button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p>: null}
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state =>({
    auth: state.firebase.auth,
    authError: state.auth.authError
})

const mapDispatchToProps = ({
    signUp: signUp
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
