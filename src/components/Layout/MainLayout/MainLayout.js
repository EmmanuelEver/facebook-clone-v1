import React from 'react'
import './MainLayout.css'
import Header from '../../Header/Header'

const MainLayout = ({children}) => {
	return(
		<div className="mainLayout">
			<Header />
			<div className="mainLayout__content">
				{children}
			</div>
		</div>
	)
}

export default MainLayout