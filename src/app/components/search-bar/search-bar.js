import React from 'react';

import Logo from '../../../assets/images/logo.png'
import './search-bar.scss';

export function SearchBar(props) {
    return (
        <header>
            <nav id="github-header" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="search-container">
                        <img className="padding-1-l logo" src={Logo} width="40" height="40" />
                        <form className="search-form form-inline">
                            <input value={props.keyword} onChange={props.onChange} className="form-control form-control-sm mr-3 search-bar" type="text" placeholder="Search for Github user" aria-label="Search for Github user" />
                            <span className="mdi mdi-magnify search-btn interactive" onClick={props.onClick}></span>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}
