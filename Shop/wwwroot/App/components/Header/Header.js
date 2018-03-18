import React from 'react';
import './Header.scss';
import MainInfo from "./MainInfo/MainInfo";
import {NavMenu} from "./NavMenu/NavMenu";

class Header extends React.Component {
	render() {
		return (
			<div className="header_container">
				<MainInfo/>
				<NavMenu />
			</div>
		);
	}
}

export default Header;