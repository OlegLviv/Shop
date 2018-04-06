import React from 'react';
import './Header.scss';
import MainInfo from "./MainInfo/MainInfo";
import NavMenu from "./NavMenu/NavMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogIn = (user) => {
        this.props.onLogIn(user);
    };

    render() {
        return (
            <div className="header_container">
                <MainInfo onLogIn={this.onLogIn}/>
                <NavMenu/>
            </div>
        );
    }
}

export default Header;