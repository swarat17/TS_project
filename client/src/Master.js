import React from 'react'
import App from './App'
import Model from './Model'
import NavBar from './NavBar'
import { Route } from 'react-router-dom'

export default function Master() {
    return (
        <div>
            <NavBar />
            <Route exact path= "/model" component={Model} />
            <Route exact path= "/master" component={App} />
        </div>
    )
}
