import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../views/Login'
import Chat from '../views/Chat'
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/chat' component={Chat} />
        </Switch>
    </BrowserRouter>
)

export default Routes;