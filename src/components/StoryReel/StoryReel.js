import React from 'react';
import './StoryReel.css';
import Story from './Story/Story'
import image1 from '../../assets/images/bg_image.webp'
import image2 from '../../assets/images/bg_image2.webp'
import image3 from '../../assets/images/bg_image3.webp'
import image4 from '../../assets/images/projects_bg.webp'
import userImage1 from '../../assets/images/githubLogo.png'
import userImage2 from '../../assets/images/dalbongIcon.png'
import userImage3 from '../../assets/images/fb-logo.svg'




const StoryReel = props => {
	const [stories, setStories] = React.useState([
			{image: image1, userImage:userImage1, username:"shalom", isViewed: false},
			{image: image2, userImage:userImage2, username:"dalbong", isViewed: true},
			{image: image3, userImage:userImage1, username:"shank", isViewed: false},
			{image: image4, userImage:userImage2, username:"dallbz Lopez", isViewed: false},
			{image: image2, userImage:userImage3, username:"facebook", isViewed: false},
		])

	const sortStories = stories => {
		let sortedStories =[]
		stories.map(story => !story.isViewed ? sortedStories.unshift(story) : sortedStories.push(story))
		return sortedStories
	}

	React.useEffect(() => {
		setStories(sortStories(stories))
	}, [])
	return(
		<div className="storyReel">
			{
				stories.map( (story, index) => (
					<Story 
						key={index}
						storyImage={story.image}
						userImage={story.userImage}
						username={story.username}
						viewed={story.isViewed}
					/>
				))
			}
		</div>
	)
}

export default StoryReel;