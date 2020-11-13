import React from 'react'
import './Widgets.css'
import Sponsor from './Sponsor/Sponsor'
import sponsor1 from '../../assets/images/sponsor1.jpg'
import sponsor2 from '../../assets/images/sponsor2.jpg'
import sponsor3 from '../../assets/images/sponsor3.png'
import sponsor4 from '../../assets/images/sponsor4.png'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {IconButton} from '@material-ui/core'
import userImage1 from '../../assets/images/githubLogo.png'
import userImage2 from '../../assets/images/dalbongIcon.png'
import userImage3 from '../../assets/images/fb-logo.svg'
import Contact from '../Contact/Contact'






const Widgets = props => {
	const [sponsors, setSponsors] = React.useState([
		{image: sponsor1, title: "Washi Tape Despenser", url:"dressmydesk.com"},
		{image: sponsor2, title: "Chick Geometric Table Lamp", url:"dressmydesk.com"},
		{image: sponsor3, title: "Digital Journal", url:"bentonotes.com"},
		{image: sponsor4, title: "Digital Planner and Stationery" , url:"bentonotes.com"}
		])
	const [contacts, setContacts] = React.useState([
		{image:userImage1, name:"github version control"},
		{image:userImage2, name:"dalbong Lopez"},
		{image:userImage3, name:"Mark Zuckerberg"},
	])
	const [counter, setCounter] = React.useState(0)

	const[toShow, setToshow] = React.useState({inset: 0, offset:2})

/*	 React.useEffect( () => {
	 		setCounter(counter + 1)
	 		console.log(counter)
			let newToShow = {...toShow}

			setInterval( async() => {

				if(newToShow.offset >= sponsors.length)
				{
					newToShow.inset = 0
					newToShow.offset = 2
					setToshow(await newToShow)
				}else{
					newToShow.inset = newToShow.inset + 2
					newToShow.offset = newToShow.inset + 2
					setToshow(await newToShow)
				}

			}, 2000)

			
			console.log(toShow.inset, toShow.offset)
	}, [toShow])*/

	return(
		<div className="widgets">
			<div className="widgets__sponsors">
				<h3>Sponsored</h3>
				{
					sponsors.slice(toShow.inset, toShow.offset).map( (sponsor, index) => (
						<Sponsor 
							image={sponsor.image}
							title={sponsor.title}
							url={sponsor.url}
							key={index}
						/>
					))
				}
			</div>
			<div className="widgets__birthdays">

			</div>
			<div className="widgets__contacts">
				<div className="widgets__contacts__header">
					<h3>Contacts</h3>
					<div className="widgets__contacts__header__buttons">
						<IconButton>
							<VideoCallIcon />
						</IconButton>
						<IconButton>
							<SearchIcon />
						</IconButton>
						<IconButton>
							<MoreHorizIcon />
						</IconButton>
					</div>
				</div>
				<div className="widgets__contacts__list">
					{
						contacts.map( (contact, index) => (
							<Contact key={index}
								image={contact.image}
								name={contact.name}
								/>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Widgets