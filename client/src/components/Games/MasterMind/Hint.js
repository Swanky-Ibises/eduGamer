export default class Hint extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.state.currentRow = 1 <= nextProps.rowId;
  }

  render() {
    return (
    <span className={this.props.hintClass}>
    </span>
    );
  }
}
