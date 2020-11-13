import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import UserRoute from './wrapper/UserRoute/UserRoute'
/*import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'*/
import { UserProvider } from './contexts/UserProvider/UserProvider'
import reducer, { initialState } from './reducers/UserReducer/userReducer'

const Home = lazy(() => import('./containers/Home/Home'))
const Profile = lazy( () => import('./containers/Profile/Profile'))

function App() {
  return (
    <UserProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Suspense fallback={() => <h1>Loading...</h1>}>
          <div className="App">
  	        <Switch>
  	          	 <UserRoute path="/:username" exact component={Profile} />
  	          	 <UserRoute path="/" component={Home} />
  	         </Switch>
          </div>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
