import React from 'react'
import './Contact.css';
import {Avatar} from '@material-ui/core'


const Contact = ({image, name}) => {
	return (

		<div className="contact">
			<Avatar className="contact__avatar" src={image}/>
			<h5>{name}</h5>
		</div>

	)
}
export default Contact