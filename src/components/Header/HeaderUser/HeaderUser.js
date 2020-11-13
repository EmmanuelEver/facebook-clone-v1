import React from 'react'
import {Avatar} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import './HeaderUser.css'

const HeaderUser = ({src, username}) => {
	return (
		<div className="headerUser">
			<NavLink to={`/${username}`}  activeClassName={"headerUser__active"}>
				<Avatar src={src} alt="" />
				<h4>{username.split(" ")[0]}</h4>
			</NavLink>
		</div>
	)
}

export default HeaderUser;