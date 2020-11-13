import React from 'react'
import './Login.css'
import fbLogo from '../../assets/images/Facebook.svg';
import Button from '@material-ui/core/Button';
import {auth, provider} from '../../Firebase'
import {useStateValue} from '../../contexts/UserProvider/UserProvider'
import {actionTypes} from '../../reducers/UserReducer/userReducer'


const Login = (props) => {
	console.log(props)
	const [state, dispatch] = useStateValue();

	const loginHandler = () => {
		auth.signInWithPopup(provider)
			.then( res => {
				console.log(res)
				dispatch({
					type: actionTypes.SET_USER,
					user:res.user
				})
			})
			.catch( err => alert(err.message))
	}



	return (
		<div className="login">
			<div className="login__container">
				<div className="login__logo">
					<img src={fbLogo} alt="" />
				</div>
				<h3>This app is only for demo purposes, No data is leaked or stolen.</h3>
				<div className="login__features">
					<h3>Features</h3>
					<ul>
						<li> <h4>Create post</h4> </li>
						<li> <h4>Upload photo</h4> </li>
						<li> <h4>Like and comment to posts</h4> </li>
						<li> <h4>View your profile</h4> </li>
						<li> <h4>Change profile cover and  photos</h4> </li>
					</ul>
				</div>
				<Button onClick={loginHandler} variant="contained" color="primary">
				  Log In
				</Button>
			</div>
		</div>
	)
}

export default Login