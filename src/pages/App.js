import React from 'react';

class App extends React.Component {
  shouldComponentMount() {
    return false;
  }

  render() {
    return (
            <div>
                <h1>Unofficial GitHub Browser v1</h1>
                {this.props.children}
            </div>
        );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
