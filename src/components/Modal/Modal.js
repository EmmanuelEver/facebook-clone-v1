import React from 'react'
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop'
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core'


const Modal = ({show, clicked, title, children}) => {

	return(
		<React.Fragment>
			{show&&
			<div className="modal">
				<div className="modal__header__wrapper">
					<div className="modal__header">
						<h2> {title} </h2>
						<IconButton onClick={clicked} className="modal__header__close" >
							<CloseIcon />
						</IconButton>
					</div>
				</div>
				<div className="modal__body__wrapper">
					{children}
				</div>
			</div>
			}
			<Backdrop show={show} clicked={clicked} />
		</React.Fragment>
	)
}

export default Modal