import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Page404, MainPage, ComicsPage, SingleComicPage, SingleCharPage} from '../pages/index';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                <Switch>
                    <Route exact path='/comics'>
                        <ComicsPage/>
                    </Route>

                    <Route exact path='/comics/:comicsId'>
                        <SingleComicPage/>
                    </Route>

                    <Route exact path='/characters/:characterId'>
                        <SingleCharPage/>
                    </Route>

                    <Route exact path='/'>
                        <MainPage/>
                    </Route>

                    <Route path='*'>
                        <Page404/>
                    </Route>
                </Switch>
                </main>
            </div>
        </Router>
        
    )
}

export default App;