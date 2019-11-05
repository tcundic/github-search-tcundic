import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';
import { Header } from './components/header/header';

class App extends React.Component {
    render() {
        return (
            <div className="body">
                <Header />
                <div className="page-content page-content--full">
                    Github search
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));