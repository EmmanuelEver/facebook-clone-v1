import React from 'react';
import './Story.css';
import {Avatar } from '@material-ui/core'

const Story = ({storyImage, userImage, username, viewed}) => {
	let classes = viewed? ["story", "story__viewed"] : ["story"]
	return (

		<div className={classes.join(" ")} style={{backgroundImage: `url(${storyImage})`}}>
			<Avatar className="story__avatar" src={userImage} />
			<h5>{username}</h5>
		</div>

	)
}

export default Story; 