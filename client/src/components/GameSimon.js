import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class GameSimon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      simon: [0,1,2],
      color: 'black',
      lose: false,
      input: []
    };
  }

  componentDidMount() {
    this.generateSimon();
    this.simonColor();
  }
  //Adds to Simon array
  generateSimon() {
    var simon = this.state.simon;
    var num = Math.floor(Math.random()*3);
    simon.push(num);
    console.log('simon is', simon);
    this.setState({simon: simon});
  }

  simonColor(){
    this.state.simon.map((num)=>{
      setTimeout(()=>{
        if(num === 0) {
        this.setState({color: 'red'});
      } else if (num === 1) {
        this.setState({color: 'violet'});
      } else if (num === 2) {
        this.setState({color: 'green'});
      } else if (num === 3) {
        this.setState({color: 'blue'});
      }
      }, 500);
      setTimeout(()=>{
        this.setState({color: 'black'})
      }, 400);
    });
  }

  handleButton(value) {
    var input = this.state.input;
    input.push(value);
    this.setState({input: input});
    for(var i = 0; i < input.length; i++) {
      if (input[i] !== this.state.simon[i]) {
        this.setState({lose: true});
      }
    }
  }

 //Change this to using map
  render() {
    return (
      <div>
        <h2>Simon</h2>
        <h3>Score: { this.state.score }</h3>
        <div className='simonSays'>
        <Grid padded>
          <Grid.Row>
          <Grid.Column width={6}/>
          <Grid.Column width={4} color={this.state.color}/>
          </Grid.Row>
          <Grid.Row/>
        </Grid>
        </div>
        <div className='simonButtons'>
        <Button color = 'red' size = 'massive' onClick={()=>this.handleButton(0)} disabled={this.state.lose}/>
        <Button color = 'violet' size = 'massive'onClick={()=>this.handleButton(1)} disabled={this.state.lose}/>
        <Button color = 'green' size = 'massive'onClick={()=>this.handleButton(2)} disabled={this.state.lose}/>
        <Button color = 'yellow' size = 'massive'onClick={()=>this.handleButton(3)} disabled={this.state.lose}/>
        </div>
        <br/>
        {this.state.lose && <Button onClick={()=>window.location.reload()}>Try Again</Button>}
      </div>
    );
  }
}
