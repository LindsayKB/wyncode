import React from 'react';
import logo from './logo.svg';
import styles from './App.css';
import fetch from 'simple-fetch';

const API_URL = 'https://api.github.com/users';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            userFound: false,
            apiMsg: '',
            repos: []
        };

     const value = 'lindsaykb';
        this.setState({ inputValue: value });

        (value !== '') ?
            fetch.getJson(`${API_URL}/${value}/repos?_limit=5`)
                .then(result => this.setState({ repos: result, userFound: true }))
                .catch(err => {
                    this.setState({ repos: [], userFound: false, apiMsg: err.message });
                }) :
            this.setState({ repos: [] });
    }

    render() {
        return (
            <div className={styles.app}>
                <h2>Welcome to my GitHub Repos!</h2>
				<ul className="repo-list">
                {this.state.userFound && this.state.repos.length > 0 ?
                    this.state.repos.slice(0,5).map((repo, index) => {
                        return <li key={index} id={repo.name} className={styles.repoName}>{repo.name} - <a href={"https://github.com/" + repo.full_name} target="_blank">VIEW</a></li>;
                    }) :
                    <li className={styles.redText}>{this.state.apiMsg}</li>
                }
				</ul>
            </div>
        );
    }
}

