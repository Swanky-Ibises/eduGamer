import React from 'react';
import { Message, Divider, Dimmer, Loader, Header } from 'semantic-ui-react';
import $ from 'jquery';

export default class WordOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: 'Loading word...',
      partOfSpeech: '',
      definition: ''
    };
  }

  componentDidMount() {
    this.getWordOfTheDay();
  }

  getWordOfTheDay() {
    var context = this;
    // $.ajax({
    //   type: 'GET',
    //   crossDomain: true,
    //   // This is fine for now because this is the public wordnik key you can find on their site
    //   url: 'http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    //   success: function(data) {
    //     var word = data.word;
    //     var definition = data.definitions[0].text;
    //     var partOfSpeech = data.definitions[0].partOfSpeech;
    //     context.setState({
    //       word: word,
    //       definition: definition,
    //       partOfSpeech: partOfSpeech
    //     });
    //   }
    // });
  }

  render() {
    return (
      <Message compact>
        {this.state.word === 'Loading word...' && <Dimmer active><Loader>Loading Word of the Day...</Loader></Dimmer>}
        <Message.Header>Word of the Day: {this.state.word}</Message.Header>
        <Divider />
        <Message.Content><Header size='tiny'>{this.state.partOfSpeech}</Header>{this.state.definition}</Message.Content>
      </Message>
    );
  }
}