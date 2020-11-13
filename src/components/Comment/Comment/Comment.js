import React from 'react';
import './Comment.css';
import {Avatar, IconButton} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';




const Comment = ({commentId,photoURL,displayName, text, timestamp}) => {
	return(
		<div className="comment">
			<Avatar src={photoURL} className="comment__avatar"/>
			<div className="comment__details"> 
				<h5>{displayName}</h5>
				<p>{text}</p>
			</div>
			<IconButton className="comment__moreIcon" >
				<MoreHorizIcon />
			</IconButton>
		</div>
	)
}

export default Comment;