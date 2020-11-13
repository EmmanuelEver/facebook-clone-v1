import React from 'react';
import './Feed.css';
import StoryReel from '../../components/StoryReel/StoryReel'
import CreatePost from '../../components/CreatePost/CreatePost'
import Post from '../../components/Post/Post'
import image1 from '../../assets/images/bg_image.webp'
import image2 from '../../assets/images/bg_image2.webp'
import image3 from '../../assets/images/bg_image3.webp'
import image4 from '../../assets/images/projects_bg.webp'
import userImage1 from '../../assets/images/githubLogo.png'
import userImage2 from '../../assets/images/dalbongIcon.png'
import userImage3 from '../../assets/images/fb-logo.svg'
import {useStateValue} from '../../contexts/UserProvider/UserProvider'
import db from '../../Firebase'

const dummyPosts = [
	{userImage:userImage2, username:"dalbong", image: image1, timestamp: "2020-09-19T06:19", message: "This website stores cookies on your computer. These cookies are used to collect information about how you interact with our website and allow us to remember you. We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our Privacy Policy. "},
	{userImage:userImage1, username:"shalom", image: image2, timestamp: "2020-06-19T20:29", message: "Get code examples like "},
	{userImage:userImage3, username:"Facebook", image: image3, timestamp: "2017-04-19T02:39", message: "Welcome to Facebook."},
	{userImage:userImage2, username:"dalbong", image: image4, timestamp: "2016-06-19T02:59", message: "Setting fromNowDuring will display the relative time as with fromNow but just during its value in milliseconds, after that format will be used instead."},

]

class Feed extends React.Component{
	state = {
		posts : []
	}

	componentDidMount(){
		const data = db.collection("posts").onSnapshot( snapshot => {
			this.setState({posts:snapshot.docs.map( doc => ({ id:doc.id, data:doc.data() }) )})
			console.log(this.state.posts)
		})
	}

	render(){
		return(
			<div className="feed">
				<StoryReel />
				<div className="feed__contents">
					<CreatePost />
					{
						this.state.posts.map( (post) => (
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
}

export default Feed;