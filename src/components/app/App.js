import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {MainPage, ComicsPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route path='/comics'>
                            <ComicsPage/>
                        </Route>

                        <Route path='/'>
                            <MainPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
        
    )
}

export default App;