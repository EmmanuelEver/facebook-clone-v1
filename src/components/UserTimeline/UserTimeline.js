import React from 'react'
import './UserTimeline.css';
import Post from '../Post/Post'
import {useRouteMatch,Link} from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost'
import SchoolIcon from '@material-ui/icons/School';
import HouseIcon from '@material-ui/icons/House';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import WorkIcon from '@material-ui/icons/Work';
import {useStateValue} from '../../contexts/UserProvider/UserProvider'
import db from '../../Firebase';


const UserTimeline = () => {
	const [{user}, dispatch] = useStateValue()
	const [userInfo, setUserInfo] = React.useState(null)
	const [posts, setPosts] = React.useState([])
	const [photos, setPhotos] = React.useState([])
	let {path, url} = useRouteMatch() 


	React.useEffect( () => {
		db.collection("posts")
		.where("uid","==", user.uid)
		.get()
		.then( (snapshot) => {
			setPosts(snapshot?.docs?.map(doc => ({ id:doc.id, data:doc.data() })))
			console.log("posts",posts)
		})

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


	return(
		<div className="userTimeline">
			<div className="userTimeline__details">
				<div className="userTimeline__intro">
					<h3>Intro</h3>
					<div className="userTimeline__intro__item">
						<HouseIcon />
						<h6>{userInfo?.address ? (`Lives in ${userInfo.address}`): ("Add address")}</h6>
					</div>
					<div className="userTimeline__intro__item">
						<FavoriteIcon />
						<h6>{userInfo?.civilStatus ? userInfo.civilStatus : "Add relationship status"}</h6>
					</div>
					<div className="userTimeline__intro__item">
						<SchoolIcon />
						<h6>{userInfo?.studied ? `Studied ${userInfo.studied}` : "Add education"}</h6>
					</div>
					<div className="userTimeline__intro__item">
						<WorkIcon />
						<h6>{userInfo?.workAt ? `Works at ${userInfo.workAt}` : "Add work"}</h6>
					</div>
					<div className="userTimeline__details__btn">
						Edit Details
					</div>
					<div className="userTimeline__details__btn">
						Add Hobbies
					</div>
					{
						userInfo?.featured? 
						(<div className="userTimeline__details__btn">
							Edit featured
						</div>) :(
						<div className="userTimeline__details__btn">
							Add featured
						</div>)
					}
				</div>
				<div className="userTimeline__photos">
					<div className="userTimeline__photos__header">
						<h3>Photos</h3>
						<h3>
							{
								photos?.length > 8 ?
									<Link to={`${url}/photos`} >
										See All
									</Link>
									:
									<Link to={`${url}`} >
										Add Photos
									</Link>
									
							}
						</h3>

					</div>
					<div className="userTimeline__photos__wrapper">
					{
						photos &&
						photos.map(( photo ) => (
								<Link key={photo.id} to={`${url}/${photo.id}`}>
									<div className="userTimeline__photos__photo" style={{backgroundImage:`url(${photo.data.imageURL})`}}>
									
									</div>
								</Link>
						))

					}
					</div>
				</div>
			</div> 
			<div className="userTimeline__posts">
				<CreatePost />
				{
						posts.map( (post) => (
							<Post
								key={post.id} 
								postId={post.id}
								userImage={post.data.userPhotoURL}
								username={post.data.username}
								image={post.data.imageURL}
								timestamp={post.data.timeStamp}
								message={post.data.message}
							/>
						))
					}
			</div>
		</div>
	)
}

export default UserTimeline;