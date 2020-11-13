import React from 'react';
import './Header.css';
import fbLogo from '../../assets/images/fb-logo.svg'
import SearchInput from '../InputFields/SearchInput/SearchInput'
import HeaderOption from './HeaderOption/HeaderOption'
import HomeIcon from '@material-ui/icons/Home'
import FlagIcon from '@material-ui/icons/Flag'
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined'
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import HeaderUser from './HeaderUser/HeaderUser' 
import {IconButton} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ForumIcon from '@material-ui/icons/Forum'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useStateValue} from '../../contexts/UserProvider/UserProvider'



const Header = props => {
	const [search, setSearch] = React.useState("")
	const [{user}, dispatch] = useStateValue()

	const setSearchHandler = e => setSearch(e.target.value)
	return(
		<nav className="header">
			<div className="header__left">
				<img src={fbLogo} alt=""/>
				<SearchInput name="search" className="" value={search} onChange={setSearchHandler} placeholder="Search Facebook" />
			</div>
			<div className="header__center">
				<HeaderOption className="active">
					<HomeIcon />
				</HeaderOption>
				<HeaderOption>
					<FlagIcon />
				</HeaderOption>
				<HeaderOption>
					<SubscriptionsOutlinedIcon />
				</HeaderOption>
				<HeaderOption>
					<StorefrontOutlinedIcon />
				</HeaderOption>
				<HeaderOption>
					<SupervisedUserCircleIcon />
				</HeaderOption>
			</div>
			<div className="header__right">
				<HeaderUser username={user.displayName} src={user.photoURL}/>
				<IconButton>
					<AddIcon />
				</IconButton>
				<IconButton>
					<ForumIcon />
				</IconButton>
				<IconButton>
					<NotificationsActiveIcon />
				</IconButton>
				<IconButton>
					<ExpandMoreIcon />
				</IconButton>
			</div>
		</nav>
	)
}

export default Header;