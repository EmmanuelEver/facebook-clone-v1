import React from 'react';
import './HeaderOption.css'


const HeaderOption = ({children, className}) => {
	let classes = className? ["headerOption", className] : ["headerOption"]

	return(
		<div className={classes.join(" ")}>
			{children}
		</div>
	)
}
export default HeaderOption