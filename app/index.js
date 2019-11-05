import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

class App extends React.Component {
    render() {
        return (
            <div>Github search</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));