import './Style.css';
import React, { useSelector } from 'react-redux';
import {
    Redirect, BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Login from './pages/Login';
import CreatePlaylist from './pages/CreatePlaylist';

function App() {
    const { isAuthorized } = useSelector((state) => state.auth);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/create-playlist" exact>
                        {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
