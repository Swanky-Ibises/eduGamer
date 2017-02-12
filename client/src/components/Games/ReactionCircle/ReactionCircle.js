import React from 'react';
import { Message, Button } from 'semantic-ui-react';

export default class ReactionCircle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Message>
        <h2>Reaction Circle</h2>
        <h3>Test your reaction time...</h3>
        <h4>Timer: 0.000</h4>
        <div className="reaction-circle">
          <Button className='start-button'>Start</Button>
        </div>
      </Message>
    );
  }
}