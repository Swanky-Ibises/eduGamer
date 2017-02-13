import {Button} from 'semantic-ui-react';
import classNames from 'classnames';

export default class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var className = classNames({
      'submit': true,
      'hidden': !(this.props.state.currentGuess.size >= this.props.state.pegsInRow && this.props.state.currentRow === this.props.rowId)
    });
    return (
    <button className={className} onClick={this.props.submitPegs}>Go</button>
    );
  }
}
