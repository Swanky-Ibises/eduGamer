import { Table } from 'semantic-ui-react';

export default class GameMemoryCard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    if (!this.props.card.flipped) {
      this.props.checkMatch(this.props.card.value, this.props.index);
    }
  }

  render() {
    return (
    <Table.Cell negative={!this.props.card.flipped} textAlign='center' onClick={this.handleClick.bind(this)}>
      {this.props.card.flipped ? this.props.card.value : 'X'}
    </Table.Cell>
    );
  }
}
