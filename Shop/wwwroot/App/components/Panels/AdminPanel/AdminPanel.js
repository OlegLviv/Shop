import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Navigation} from "./Navigation/Navigation";
import './AdminPanel.scss';
import {ActionOnProducts} from "./ActionOnProducts/ActionOnProducts";

export const AdminPanel = () => {
    return (
        <div className="row container-adm-panel">
            <div className="col-2 container-adm-panel__navigation">
                <Navigation/>
            </div>
            <div className="col-10">
                <Route exact path="/adminPanel/action-on-products" component={ActionOnProducts}/>
                <Route path="/adminPanel/action-on-products/add-new" render={()=><div>add new</div>}/>
                <Route path="/adminPanel/action-on-products/edit" render={()=><div>edit</div>}/>
                <Route path="/adminPanel/users" render={() => <div>users</div>}/>
                <Route path="/adminPanel/site-settings" render={() => <div>site settings</div>}/>
                <Route path="/adminPanel/owner-settings" render={() => <div>owner settings</div>}/>
            </div>
        </div>
    )
};