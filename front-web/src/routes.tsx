import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header';
import Records from './pages/Records'
import Charts from './pages/Charts'
const Routes = () => (
    <BrowserRouter>
        <Header></Header>
        <Switch>
            <Route path="/" exact> 
                <Home></Home>
            </Route>
            <Route path="/records"> 
                <Records></Records>
            </Route>
            <Route path="/charts"> 
                <Charts></Charts>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;