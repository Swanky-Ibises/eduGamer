import React from 'react';
import { Message } from 'semantic-ui-react';

export default class WordOfTheDay extends React.Component {
  render() {
    return (
      <Message compact>
        <Message.Header>Word Here</Message.Header>
        <Message.Content>Definition of word blah hi there how are you doing andy josephine eric kevin</Message.Content>
      </Message>
    );
  }
}