import React from 'react'
import './CreatePostModal.css'
import {Avatar, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import TagFacesRoundedIcon from '@material-ui/icons/TagFacesRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import PublicIcon from '@material-ui/icons/Public';
import Button from '@material-ui/core/Button';





const CreatePostModal = ({show, closeHandler, submitHandler, username, profilePic, message, messageHandler,file, fileHandler}) => {
	const [profileUrl, setProfileUrl] = React.useState()
	const [previewImage, setPreviewImage] = React.useState()
	let fileInputRef = React.createRef(null)

	React.useEffect( () => {setProfileUrl(profilePic)}, [])





	return(
		<React.Fragment>
		{show ? <div className="createPostModal">
					<div className="createPostModal__header__wrapper">
						<div className="createPostModal__header">
							<h2> Create Post </h2>
							<IconButton className="createPostModal__header__close" >
								<CloseIcon onClick={closeHandler} />
							</IconButton>
						</div>
					</div>
					<div className="createPostModal__user__wrapper">
						<div className="createPostModal__user">
							<Avatar src={profileUrl} className="createPostModal__user__avatar" />
							<div className="createPostModal__user__details">
								<h4>{username}</h4>
								{ /*Todo add select for privacy options*/}
								<h6>Public</h6>
							</div>
						</div>
					</div>
					<div className="createPostModal__body__wrapper">
						<div className="createPostModal__body">
							<textarea 
								placeHolder={`What's on your mind,${username.split(" ")[0]}?`} 
								value={message} onChange={messageHandler} 
								className="createPostModal__textArea"/>
							<div className="createPostModal__file">
								{file ? <img src={file} alt="" /> : null}
							</div>
						</div>
					</div>
					<div className="createPostModal__actions__wrapper">
						<div className="createPostModal__actions">
							<h3>Add to Your Post</h3>
							<div>
								<VideoCallRoundedIcon className="videoCallRoundedIcon" />
								<PhotoLibraryRoundedIcon onClick={() => fileInputRef.current.click()} className="photoLibraryRoundedIcon"/>
								<input type="file" ref={fileInputRef}  style={{display:"none"}} onChange={fileHandler} />
								<GroupAddRoundedIcon className="groupAddRoundedIcon"/>
								<TagFacesRoundedIcon className="tagFacesRoundedIcon"/>
								<LocationOnRoundedIcon className="locationOnRoundedIcon"/>
								<MoreHorizRoundedIcon className="moreHorizRoundedIcon"/>
							</div>
						</div>
					</div>
					<div className="createPostModal__button__wrapper">
						<Button onClick={submitHandler} variant="contained" disabled={message || file? false: true}>
							Post
						</Button>
					</div>
				</div>
		: null }
		</React.Fragment>
	)
}

export default CreatePostModal;