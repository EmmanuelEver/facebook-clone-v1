import React from 'react'
import './CreatePost.css'
import TextInput from '../InputFields/TextInput/TextInput'
import {Avatar} from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import db, { storage} from '../../Firebase';
import firebase from 'firebase'
import { useStateValue } from '../../contexts/UserProvider/UserProvider'
import Backdrop from '../Backdrop/Backdrop';
import Modal from './Modal/CreatePostModal'


const CreatePost = () => {
	const [inputText, setInputText] = React.useState("")
	const [inputFile, setInputFile] = React.useState(null)
	const [previewFile, setPreviewFile] = React.useState(null)
	const [showModal, setShowModal] = React.useState(false)
	const [{user}, dispatch] = useStateValue()

	//state handlers
	const inputTextHandler = e => setInputText(e.target.value)
	const inputFileHandler = e => {
		const file_ext = ["PNG", "JPG", "JPEG", "GIF"]
		const file = e.target.files[0]
		if(file && file_ext.includes(file.name.split(".").slice(-1)[0].toUpperCase())){
			setInputFile(file)
			setPreviewFile(URL.createObjectURL(file))
			console.log(previewFile)
		}
	}
	const showModalHandler = e => setShowModal(!showModal)

	const formHandler = e => {
		e.preventDefault()
		let data = ""
		if(inputFile){
			const uploadImage = storage.ref(`images/${user.uid}-${inputFile.name}`).put(inputFile)
			uploadImage.on(
				"state_changed",
				snapshot => {console.log(snapshot)},
				err => alert(err.message),
				() => {
					storage
					.ref("images")
					.child(`${user.uid}-${inputFile.name}`)
					.getDownloadURL()
					.then( url => {
						console.log(url)
						data = url
						db.collection("posts").add({
							imageURL:url,
							message:inputText,
							timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
							userPhotoURL:user.photoURL,
							username:user.displayName
						})
					})
				}
			)
		}
		else{
			db.collection("posts")
			.add({
					message:inputText,
					timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
					userPhotoURL:user.photoURL,
					username:user.displayName,
					uid:user.uid
				})
		}

		setInputText("")
		setInputFile(null)
		setPreviewFile(null)
		setShowModal(false)

		/*db.collection("posts").add(data)*/
	}





	return(
		<React.Fragment>
			<Backdrop show={showModal} submitHandler={formHandler} clicked={showModalHandler} fill="rgba(255,255,255,.7)" />
			<Modal 
				username={user.displayName} 
				profilePic={user.photoURL} 
				show={showModal} 
				submitHandler={formHandler}
				closeHandler={showModalHandler} 
				message={inputText} 
				messageHandler={inputTextHandler}
				file={previewFile}
				fileHandler={inputFileHandler}/>
			<div className="createPost">
				<form onSubmit={formHandler} className="createPost__form">
					<Avatar src={user.photoURL} />
					<TextInput clicked={showModalHandler} value={inputText} onChange={inputTextHandler} placeholder={`What's on your mind ${user.displayName.split(" ")[0]}?`} className="createPost__form__input" />
					<button className="createPost__form__submit"> hidden Submit</button>
				</form>
				<div className="createPost__options">
					<div className="createPost__option">
						<VideocamIcon className="videoCamIcon" />
						<h5>Live Video</h5>
					</div>
					<div className="createPost__option">
						<PhotoLibraryIcon className="photoLibraryIcon" />
						<h5>Photo/Video</h5>
					</div>
					<div className="createPost__option">
						<InsertEmoticonIcon className="insertEmoticonIcon"/>
						<h5>Feeling/Activity</h5>
					</div>
				</div>
			</div>
		</React.Fragment>
	)	
}

export default CreatePost;