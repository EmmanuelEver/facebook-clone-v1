import React from 'react'
import {Route} from 'react-router-dom'
import Login from '../../containers/Login/Login'
import {useStateValue} from '../../contexts/UserProvider/UserProvider'

const UserRoute = ({component: Component, ...rest}) => {
	const [{user}, dispatch] = useStateValue()
	return(
		<React.Fragment>
		{ user ?	<Route {...rest} render={ props => <Component{...props} /> } /> : <Login />}
		</React.Fragment>
	)
}

export default UserRoute;