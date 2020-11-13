import React from 'react'
import './Post.css'
import {Avatar, IconButton} from '@material-ui/core'
import Moment from 'react-moment';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ReplyIcon from '@material-ui/icons/Reply';
import AddComent from '../Comment/AddComent/AddComent'
import Comment from '../Comment/Comment/Comment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import db from '../../Firebase'
import firebase from 'firebase'
import {useStateValue} from '../../contexts/UserProvider/UserProvider'





const Post = ({userImage, username, image, timestamp, message, postId}) => {
	const [{user}, dispatch] = useStateValue()
	const [comments, setComments] = React.useState([])
	const [comment, setComment] = React.useState("")
	const [likes, setLikes] = React.useState(null)
	const [isPostLiked, setIsPostLiked] = React.useState(false)


	//state Handler
	const commentHandler = (e) => setComment(e.target.value)


	//handler for submitting a comment of this post 
	const submitCommentHandler = (e) => {
		e.preventDefault()
		db.collection("posts")
		.doc(postId)
		.collection("comments")
		.add({
			text:comment,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			user:{
				uid:user.uid,
				photoURL:user.photoURL,
				displayName:user.displayName
			}
		})
		setComment("")
	}

	//handler for liking this post
	const likePostHandler = () => {
		if(isPostLiked){
			db.collection("posts")
			  .doc(postId)
			  .collection("likes")
			  .doc(user.uid)
			  .delete()
			  .then( () => {
			  	console.log("unliked")
			  	setIsPostLiked(false)
			  })
			  .catch( err => alert(err.message))
		}else{
			db.collection("posts")
			  .doc(postId)
			  .collection("likes")
			  .doc(user.uid)
			  .set({
			  	photoURL: user.photoURL,
			  	uid:user.uid,
			  	username:user.displayName
			  })
			  .then( () => {
			  	console.log("liked")
			  	setIsPostLiked(true)
			  })
			  .catch( err => alert(err.message))
		}
	}

	//useEffect for getting comments of this post from db
	React.useEffect( () => {
		let isMounted = true;
		if (isMounted && postId){
			db.collection("posts")
			.doc(postId)
			.collection("comments")
			.onSnapshot( (snapshot) => {
				if(snapshot.docs.length >= 1){
			  		setComments(snapshot.docs.map( doc => doc.data()))
			  	}
				
			})
		} 
		return ( () => isMounted = false)

	}, [postId])

	//useEffect for getting likes of this post from db
	React.useEffect( () => {
		let isMounted = true;
		if (isMounted && postId){
			db.collection("posts")
			  .doc(postId)
			  .collection("likes")
			  .get()
			  .then(snapshot => {
			  	if(snapshot.docs.length >= 1){
			  		setLikes(snapshot.docs.map( doc => ({username:doc.username, photoURL:doc.photoURL})))
			  		
			  	}		  	
			  })
		}
		return ( () => isMounted = false)
	}, [postId])

	//useEffect to know if this post is liked by user
	React.useEffect(() => {
		db.collection("posts")
		  .doc(postId)
		  .collection("likes")
		  .doc(user.uid)
		  .get()
		  .then( snapshot => {
		  	snapshot.exists? setIsPostLiked(true) : setIsPostLiked(false)
		  	if(snapshot.exists){
		  		console.log(snapshot.data())
		  	}
		  	else{
		  		console.log(postId, ":empty data")
		  	}
		
		  })
	},[isPostLiked])





	return(
		<div className="post">
			<div className="post__header">
				<Avatar className="post__avatar" src={userImage} />
				<div className="post__header__userInfo">
					<h5>{username}</h5>
					<h6> 
						{/*<Moment fromNow parse="YYYY-MM-DD HH:mm">
													{timestamp}
												</Moment>*/}
						{new Date(timestamp?.toDate()).toUTCString()}
					</h6>
				</div>
				<IconButton >
					<MoreHorizIcon className="post__header__more"/>
				</IconButton>
			</div>
			<div className="post__body">
				<p>{message}</p>
			</div>
			<div className="post__image">
				<img src={image} alt={message} />
			</div>
			<div className="post__footer">
				<div className="post__footer__options">
					<div onClick={likePostHandler} className={isPostLiked? ["post__footer__option", "option__like", "liked"].join(" ") : ["post__footer__option", "option__like"].join(" ")}>
						<ThumbUpAltTwoToneIcon className="thumbUpIcon" />
						<h5>Like</h5>
					</div>
					<div className="post__footer__option">
						<ChatBubbleOutlineIcon className="chatBubbleOutlineIcon" />
						<h5>Comment</h5>
					</div>
					<div className="post__footer__option">
						<ReplyIcon className="replyIcon" />
						<h5>Share</h5>
					</div>
				</div>
				<div className="post__footer__react">
					<AddComent photoURL={user.photoURL} formSubmitHandler={submitCommentHandler} comment={comment} commentHandler={commentHandler}/>
				</div>
				<div className="post__footer__comments">
					{
						comments?.map( comment => (
							<Comment
								key={comment.id}
								commentId={comment.id}
								photoURL={comment.user.photoURL}
								displayName={comment.user.displayName}
								text={comment.text}
								timestamp={comment.timestamp}
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Post