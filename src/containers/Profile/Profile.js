import React from 'react';
import './Profile.css';
import {Switch, useParams, useRouteMatch, NavLink} from 'react-router-dom';
import UserRoute from '../../wrapper/UserRoute/UserRoute'
import ProfileHeaderCover from '../../components/ProfileHeaderCover/ProfileHeaderCover'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import UserTimeline from '../../components/UserTimeline/UserTimeline'
import UserAbout from '../../components/UserAbout/UserAbout'
import UserPhotos from '../../components/UserPhotos/UserPhotos'
import UserFriends from '../../components/UserFriends/UserFriends'
import UserArchives from '../../components/UserArchives/UserArchives'
import MainLayout from '../../components/Layout/MainLayout/MainLayout'


import {useStateValue} from '../../contexts/UserProvider/UserProvider'

const Profile = () => {
	const [{user}, dispatch] = useStateValue()
	let {path, url} = useRouteMatch() 


	return(
		<MainLayout>
			<div className="profile">
				<div className="profile__header__wrapper">
					<div className="profile__header">
						<ProfileHeaderCover 
							profileURL={user.photoURL}
						/>
						<div className="profile__header__name">
							<h1>
								{user.displayName} 
								{user.nickName? <span>({user.nickName})</span> : null}

							</h1>
							{user.bio? <p>{}user.bio</p> : null}
							{user.websiteURL? <a className="profile__header__websiteUrl">{user.websiteURL}</a> : null}
						</div>

						<div className="profile__header__nav">
							<div className="profile__header__nav__navItems">
								<ul>
									<li>
										<NavLink activeClassName={"profile__nav__active"} to={`${url}/`}>
											<h6>Timeline</h6>
										</NavLink>
									</li>
									<li>
										<NavLink activeClassName={"profile__nav__active"} to={`${url}/about`}>
											<h6>About</h6>
										</NavLink>
									</li>
									<li>
										<NavLink activeClassName={"profile__nav__active"} to={`${url}/friends`}>
											<h6>Friends {user.friends? <span>{user.friends}</span> : null} </h6>
										</NavLink>
										
									</li>
									<li>
										<NavLink activeClassName={"profile__nav__active"} to={`${url}/photos`}>
											<h6>Photos</h6>
										</NavLink>
										
									</li>
									<li>
										<NavLink activeClassName={"profile__nav__active"} to={`${url}/archives`}>
											<h6>Archive</h6>
										</NavLink>
										
									</li>
									<li>
								
										<h6>More <ArrowDropDownRoundedIcon /> </h6>
										
									</li>
								</ul>
							</div>
							<div className="profile__header__nav__buttons">
								<div>
									<EditIcon />
									<h5>Edit Profile</h5>
								</div>
								<div>
									<VisibilityIcon />
								</div>
								<div>
									<SearchIcon />
								</div>
								<div>
									<MoreHorizIcon />
								</div> 
							</div>
						</div>
					</div>
				</div>
				<div className="profile__body">
					<Switch>
						<UserRoute path={path} component={UserTimeline}/>
						<UserRoute path={`${path}/about`} component={UserAbout}/>
						<UserRoute path={`${path}/friends`} component={UserFriends}/>
						<UserRoute path={`${path}/photos`} component={UserPhotos}/>
						<UserRoute path={`${path}/archives`} component={UserArchives}/>
					</Switch>
				</div>
			</div>
		</MainLayout>
	)
}

export default Profile;