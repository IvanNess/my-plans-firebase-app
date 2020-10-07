import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createProject } from '../../store/actions/projectActions'

const CreateProject = ({createProject, auth, history}) => {

    const [state, setState] = useState({
        title: '',
        content: ''
    })

    if(auth.isLoaded && !auth.uid)
        return <Redirect to={`/signin`}/>

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
        createProject(state)
        history.push('/')
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea id="content" className="materialize-textarea" onChange={handleChange}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state =>({
    auth: state.firebase.auth
})


const mapDispatchToProps = ({
    createProject
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
