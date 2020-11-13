import React from 'react'
import './Backdrop.css'

const Backdrop = ({show, clicked, fill}) => {
	let costumStyles = {
		backgroundColor: fill? fill: "rgba(0,0,0,.1)",
		position: "fixed",
		zIndex: "200",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		overflow: "hidden"
	}

	React.useEffect(() => {

	    	show ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'; 

	  		}, [show]);

	return (show ? <div onClick={clicked} className="backdrop" style={costumStyles}/> : null)

}

export default Backdrop;