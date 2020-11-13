import React from 'react';
import './AddComent.css'
import {Avatar} from '@material-ui/core'
import TextInput from '../../InputFields/TextInput/TextInput'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';


const AddComent = ({comment, commentHandler, formSubmitHandler, photoURL}) => {
	return(
		<form onSubmit={formSubmitHandler} className="addComent">
			<Avatar src={photoURL} className="addComent__avatar"/>
			<div className="addComent__input">
				<TextInput className="addComent__input__input" name="comment" value={comment} onChange={commentHandler} placeholder="Write a comment..."/>
				<SentimentSatisfiedOutlinedIcon />
				<CameraAltOutlinedIcon />
				<GifOutlinedIcon />
			</div>
		</form>
	)
}

export default AddComent