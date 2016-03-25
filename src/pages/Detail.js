import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          mode: 'commits',
          commits: [],
          issues: [],
          pulls: []
      };
  }

  componentWillMount() {
    ajax.get('https://api.github.com/repos/yqian1991/myreact/commits')
        .end((error, response) => {
            if (!error && response) {
              console.dir(response.body);
              this.setState({ commits: response.body });
            } else {
              console.log('There was an error fetching from GitHub', error);
            }
        }
    );

    ajax.get('https://api.github.com/repos/yqian1991/myreact/issues?state=closed')
        .end((error, response) => {
            if (!error && response) {
              console.dir(response.body);
              this.setState({ issues: response.body });
            } else {
              console.log('There was an error fetching from GitHub', error);
            }
        }
    );

    ajax.get('https://api.github.com/repos/yqian1991/myreact/pulls')
        .end((error, response) => {
            if (!error && response) {
              console.dir(response.body);
              this.setState({ pulls: response.body });
            } else {
              console.log('There was an error fetching from GitHub', error);
            }
        }
    );
  }

  renderCommits() {
      return this.state.commits.map((commit, index) => {
          const author = commit.author ? commit.author.login : 'Anonymous';

          return (<p key={index}>
              <strong>{author}</strong>:
              <a href={commit.html_url}>{commit.commit.message}</a>.
          </p>);
      });
  }

  renderIssues() {
      return this.state.issues.map((issue, index) => {
          const owner = issue.owner ? issue.owner.login : 'Anonymous';

          return (<p key={index}>
              <strong>{owner}</strong>: Issue at :
              <a href={issue.html_url}>{issue.html_url}</a> at {issue.created_at}.
          </p>);
      });
  }

  renderPulls() {
      return this.state.pulls.map((pull, index) => {
          const user = pull.user ? pull.user.login : 'Anonymous';

          return (<p key={index}>
              <strong>{user}</strong>:
              <a href={pull.html_url}>{pull.body}</a>.
          </p>);
      });
  }

  showCommits() {
      this.setState({ mode: 'commits' });
  }

  showIssues() {
      this.setState({ mode: 'issues' });
  }

  showPulls() {
      this.setState({ mode: 'pulls' });
  }

  render() {
      let content;

      if (this.state.mode === 'commits') {
          content = this.renderCommits();
      } else if (this.state.mode === 'issues') {
          content = this.renderIssues();
      } else {
          content = this.renderPulls();
      }

      return (<div>
          <button onClick={this.showCommits.bind(this)}>Show Commits</button>
          <button onClick={this.showIssues.bind(this)}>Show Issues</button>
          <button onClick={this.showPulls.bind(this)}>Show Pulls</button>
          {content}
      </div>);
  }
}
export default Detail;
