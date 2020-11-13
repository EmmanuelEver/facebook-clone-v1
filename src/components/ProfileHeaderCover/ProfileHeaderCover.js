import React from 'react'
import './ProfileHeaderCover.css';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import {Avatar} from '@material-ui/core'
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Modal from '../Modal/Modal'
import {useStateValue} from '../../contexts/UserProvider/UserProvider'
import db,  {storage} from '../../Firebase';
import firebase from 'firebase'
import AddIcon from '@material-ui/icons/Add';


const ProfileHeaderCover = ({profileURL, coverURL}) => {
	const [{user}, dispatch] = useStateValue()
	const [editCoverOptions, setEditCoverOptions] = React.useState(false)
	const [editCoverModal, setEditCoverModal] = React.useState(false)
	const [editProfileModal, setEditProfileModal] = React.useState(false)
	const [photos, setPhotos] = React.useState([])
	const [previewCover, setPreviewCover] = React.useState("")
	const [coverPhotofile, setCoverPhotofile] = React.useState(null)
	const [previewProfile, setPreviewProfile] = React.useState("")
	const [profilePhotofile, setProfilePhotofile] = React.useState(null)
	let coverPhotoInputRef = React.createRef(null)
	let profilePhotoInputRef = React.createRef(null)



	//state handlers
	const editCoverOptionsHandler = e => setEditCoverOptions(!editCoverOptions)
	const editCoverModalHandler = e => setEditCoverModal(!editCoverModal)
	const editProfileModalHandler = e => setEditProfileModal(!editProfileModal)
	const cancelEditCoverHandler = e => setPreviewCover(null)
	const cancelEditProfileHandler = e => setPreviewProfile(null)

	const submitCoverHandler = e => {
		let data = ""
		if(coverPhotofile){
			const uploadImage = storage.ref(`images/${user.uid}-${coverPhotofile.name}`).put(coverPhotofile)
			uploadImage.on(
				"state_changed",
				snapshot => {console.log(snapshot)},
				err => alert(err.message),
				() => {
					storage
					.ref("images")
					.child(`${user.uid}-${coverPhotofile.name}`)
					.getDownloadURL()
					.then( url => {
						console.log(url)
						data = url
						db.collection("posts").add({
							imageURL:url,
							timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
							uid:user.uid
						})
					})
				}
			)
		}
		setCoverPhotofile(null)
		setPreviewCover(null)
	}

	const submitProfileHandler = e => {
		let data = ""
		if(coverPhotofile){
			const uploadImage = storage.ref(`images/${user.uid}-${profilePhotofile.name}`).put(profilePhotofile)
			uploadImage.on(
				"state_changed",
				snapshot => {console.log(snapshot)},
				err => alert(err.message),
				() => {
					storage
					.ref("images")
					.child(`${user.uid}-${profilePhotofile.name}`)
					.getDownloadURL()
					.then( url => {
						console.log(url)
						data = url
						db.collection("posts").add({
							imageURL:url,
							timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
							uid:user.uid
						})
					})
				}
			)
		}
		setProfilePhotofile(null)
		setPreviewProfile(null)
	}

	const setPreviewCoverHandler = e => {
		const file_ext = ["PNG", "JPG", "JPEG", "GIF"]
		const file = e.target.files[0]
		if(file && file_ext.includes(file.name.split(".").slice(-1)[0].toUpperCase())){
			setCoverPhotofile(file)
			setPreviewCover(URL.createObjectURL(file))
		}
	}

	const setProfileHandler = e => {
		const file_ext = ["PNG", "JPG", "JPEG", "GIF"]
		const file = e.target.files[0]
		if(file && file_ext.includes(file.name.split(".").slice(-1)[0].toUpperCase())){
			setProfilePhotofile(file)
			setPreviewProfile(URL.createObjectURL(file))
		}
	}


	React.useEffect( () => {
		console.log("useEffect")
		db.collection("posts")
		  .where("uid", "==", user.uid)
		  .orderBy("imageURL")
		  .get()
		  .then( snapshot => {
		  	console.log(snapshot.docs)
		  	setPhotos(snapshot?.docs.map( doc => ({id:doc.id, data:doc.data()}) ))
		  	console.log("photos", photos)
		  })

	}, [user.uid])


	return (
		<React.Fragment>
			<div className="profileHeaderCover">
				<div className="profileHeaderCover__coverPhoto">
					{ previewCover &&
					<div className="profileHeaderCover__edit__actions">
						<button onClick={cancelEditCoverHandler}> Cancel </button>
						<button onClick={submitCoverHandler} >Save Changes</button>
					</div>
					}
					<img src={previewCover? previewCover : coverURL} alt="coverPhoto" />
				</div>
				<div className="profileHeaderCover__profilePhoto">
					<div className="profileHeaderCover__profilePhoto__container">
						<Avatar src={profileURL} className="profilePhoto__avatar" />
						<div className="profileHeaderCover__editProfileButtion">
							<PhotoCameraRoundedIcon onClick={editProfileModalHandler} />
						</div>
					</div>
				</div>
				<div className="profileHeaderCover__editCoverPhoto">
					<div onClick={editCoverOptionsHandler} className="profileHeaderCover__editCoverPhoto__button">
						<PhotoCameraRoundedIcon />
						Edit Cover Photo
						<React.Fragment>
						{ editCoverOptions &&
						<div className="profileHeaderCover__editCoverPhoto__options">
							<div onClick={editCoverModalHandler} className="profileHeaderCover__editCoverPhoto__option">
								<PhotoLibraryOutlinedIcon />
								Select Photo
							</div>
							<div  onClick={() => coverPhotoInputRef.current.click()} className="profileHeaderCover__editCoverPhoto__option">
								<PublishOutlinedIcon />
								Upload Photo
							</div>
							<div className="profileHeaderCover__editCoverPhoto__option">
								<OpenWithIcon />
								Reposition
							</div>
							<hr/>
							<div className="profileHeaderCover__editCoverPhoto__option">
								<DeleteOutlinedIcon />
								Remove
							</div>
						</div>
						}
						</React.Fragment>
					</div>
					<input type="file" ref={coverPhotoInputRef} style={{display:"none"}} onChange={setPreviewCoverHandler}/>
				</div>
			</div>
			<Modal show={editCoverModal} clicked={editCoverModalHandler} title="Select Photo" >
				<div className="editCoverModal__body">
					<div className="editCoverModal__photos">
					{
						photos?.map( photo => {
										<div key={photo.id} className="editCoverModal__photo" style={{backgroundImage:`url(${photo.data.imageURL})`}}>
										</div>
									})
					}
					</div>
				</div>
			</Modal>

			<Modal show={editProfileModal} clicked={editProfileModalHandler} title="Update Profile Picture" >
				<div className="editCoverModal__body">
					<div className="editModal__uploadPhoto">
						<button onClick={() => profilePhotoInputRef.current.click() }> <AddIcon />  Upload Photo</button>
						<input type="file" ref={profilePhotoInputRef} style={{display:"none"}} onChange={setProfileHandler}/>
						{
							previewProfile && <img src={previewProfile} />
						}
					</div>
					<div className="editCoverModal__photos">
					{
						photos?.map( photo => {
										<div key={photo.id} className="editCoverModal__photo" style={{backgroundImage:`url(${photo.data.imageURL})`}}>
										</div>
									})
					}
					</div>
					{
						previewProfile && 
						<div className="editModal__uploadPhoto__actions">
							<button onClick={cancelEditProfileHandler}> Cancel </button>
							<button onClick={submitProfileHandler}> Save Profile </button>
						</div>
					}
				</div>
			</Modal>
		</React.Fragment>
	)
}

export default ProfileHeaderCover;