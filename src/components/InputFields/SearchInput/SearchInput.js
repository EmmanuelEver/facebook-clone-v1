import React from 'react';
import './SearchInput.css'
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({className, name, value, onChange, placeholder}) => {
	let classList = className ? ["searchInput", className] : ["searchInput"]
	return (
		<div className={ classList.join(" ")}>
			<SearchIcon />
			<input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
		</div>
	)
}

export default SearchInput