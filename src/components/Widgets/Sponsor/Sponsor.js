import React from 'react';
import './Sponsor.css'


const Sponsor = ({image, title, url}) => {
	return(
		<div className="sponsor">
			<div className="sponsor__image" style={{backgroundImage: `url(${image})`}}>
			</div>
			<div className="sponsor__details">
				<h4>{title}</h4>
				<h6>{url}</h6>
			</div>
		</div>
	)
}

export default Sponsor;