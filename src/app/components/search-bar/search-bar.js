import React from 'react';
import Logo from '../../../assets/images/logo.png'
import './search-bar.scss';

export function SearchBar() {
    return (
        <header>
            <nav id="github-header" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="search-container" href="/">
                        <img className="padding-1-l logo" src={Logo} width="40" height="40" />
                        <form className="search-form form-inline">
                            <input className="form-control form-control-sm mr-3 search-bar" type="text" placeholder="Search for Github user" aria-label="Search for Github user" />
                            <span className="mdi mdi-magnify search-btn"></span>
                        </form>
                    </a>
                </div>
            </nav>
        </header>
    )
}
