import React from 'react';
import './TextInput.css'

const TextInput = ({className, name, value, onChange, placeholder, clicked}) => {
	let classList = className ? ["textInput", className] : ["textInput"]
	return (
		<div onClick={clicked} className={ classList.join(" ")}>
			<input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
		</div>
	)
}

export default TextInput