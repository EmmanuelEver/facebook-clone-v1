import React from 'react';
import './Sidebar.css'
import SidebarItem from './SidebarItem/SidebarItem';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import StorefrontIcon from '@material-ui/icons/Storefront'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import {ExpandMoreOutlined} from '@material-ui/icons'
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import HistoryIcon from '@material-ui/icons/History';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useStateValue} from '../../contexts/UserProvider/UserProvider'






const Sidebar = (props) => {
	const [{user}, dispatch] = useStateValue()


	return (
		<div className="sidebar">
			<SidebarItem 
				title={user.displayName}
				src={user.photoURL}  
				/>
			<SidebarItem 
				title="COVID-19 Information Center"  
				Icon={LocalHospitalIcon}
				/>
			<SidebarItem 
				title="Pages"  
				Icon={EmojiFlagsIcon}
				/>	
			<SidebarItem 
				title="Friends"  
				Icon={PeopleIcon}
				/>	
			<SidebarItem 
				title="Messenger"  
				Icon={ChatIcon}
				/>	
			<SidebarItem 
				title="Marketplace"  
				Icon={StorefrontIcon}
				/>	
			<SidebarItem 
				title="Videos"  
				Icon={VideoLibraryIcon}
				/>	
			<SidebarItem 
				title="Events"  
				Icon={InsertInvitationIcon}
				/>	
			<SidebarItem 
				title="Memories"  
				Icon={HistoryIcon}
				/>	
			<SidebarItem 
				title="Saved"  
				Icon={TurnedInIcon}
				/>	
			<SidebarItem 
				title="See More"  
				Icon={ExpandMoreIcon}
				/>	

		</div>

	)
}

export default Sidebar;