import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../containers/Feed/Feed'
import Widgets from '../../components/Widgets/Widgets'


const Home = props => {


	return(
		<React.Fragment>
		  <Header />
      <div className="home__body">
        <Sidebar />
        <Feed />
        <Widgets  />
      </div>
    </React.Fragment>
	)
}

export default Home