import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
  constructor(props) {
      super(props);
      const people = [];
      for (let i = 0; i < 5; i++) {
          people.push({
              name: chance.first(),
              country: chance.country({ full: true }),
              country_code: chance.country()
          });
      }
      this.state = { people };
      this.state.single_name = chance.first()
  }

    buttonClicked() {
      const newState = {
          single_name: chance.first(),
      };
      this.setState(newState);
    }

    shouldUpdateComponent() {
      return false;
    }

    render() {
        return (<div>
        {this.state.people.map((person, index) => (
            <p>Hello, {person.name} from {person.country}, {person.country_code}!</p>
        ))}
        <button onClick={this.buttonClicked.bind(this)}>Meet Someone New</button>
        <p>Hello, changed to {this.state.single_name}.</p>
        </div>);
    }
}
export default Detail;
