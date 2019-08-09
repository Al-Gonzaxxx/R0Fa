import * as React from 'react';
//import MainLayout from '../MainLayout'

import AdminPage from '../../pages/adminPage';
import AdminHomePage from '../../pages/adminHome';
import HomePage from '../../pages/homePage';
import { useUserContext } from '../../../context/UserContext';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'





const Routerm = () => {
  const { userState, getUser } = useUserContext()
  



  // React.useEffect(() => {
  //   getUser()
  //   return () => {}
  // }, [userState.user && userState.user.id])

  // if (!userState.user && userState.loggingIn) {
  //   return null
  // }

  return (
    <Router>
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/admin" component={AdminPage}  exact/>
          (true && < Route path="/adminhome" component={AdminHomePage}  exact/>)
        </Switch>
    </Router>
  )
}


export { Router, Route, Switch, Redirect, Link , Routerm};
