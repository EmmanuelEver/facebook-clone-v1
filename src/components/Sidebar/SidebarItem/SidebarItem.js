import React from 'react';
import './SidebarItem.css'
import {Avatar} from '@material-ui/core'


const SidebarItem = ({className, title, src, Icon}) => {
	let classes = className? ["sidebarItem" , className] : ["sidebarItem"]
	return (
		<div className={classes.join(" ")}>
			{ Icon? <Icon/> : <Avatar src={src} alt=""/> }
			<h5> {title} </h5>
		</div>
	)
}

export default SidebarItem;