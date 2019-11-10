import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Logo from '../../../assets/images/logo.ico'
import './search-bar.scss';

export const SearchBar = ({keyword, onChange, onClick}) => {
    let searchBtn = React.createRef();

    return (
        <header>
            <nav id="github-header" className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <div className="search-container">
                        <Link to='/'>
                            <img className="padding-1-l logo interactive" src={Logo} width="40" height="40" />
                        </Link>
                        <form className="search-form form-inline">
                            <input
                                value={keyword}
                                onChange={onChange}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        searchBtn.current.click();
                                    }
                                }}
                                className="form-control form-control-sm mr-3 search-bar"
                                type="text"
                                placeholder="Search for Github user"
                                aria-label="Search for Github user" />
                            <Link to='/'>
                                <span className="mdi mdi-magnify search-btn interactive" ref={searchBtn} onClick={onClick}></span>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}
