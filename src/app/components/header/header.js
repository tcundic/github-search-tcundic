import React from 'react';
import Logo from '../../../assets/images/logo.png'

export function Header() {
    return (
        <header>
            <nav id="github-header" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="logo-link" href="/">
                        <img className="padding-1-l" src={Logo} width="40" height="40" />
                        <span className="title">Github search</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}
