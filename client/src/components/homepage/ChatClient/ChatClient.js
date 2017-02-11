import React from 'react';
import { Message, Grid } from 'semantic-ui-react';

export default class ChatClient extends React.Component {
  render() {
    return (
      <Grid.Column width={12}>
        <Message>
          <h1>Hello World</h1>
        </Message>
      </Grid.Column>
    );
  }
}