export default class Peg extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <span className={this.props.pegClass}>
      <input type='radio'
        name={this.props.name}
        value={this.props.value}
        id={this.props.idVal}
        onClick={this.props.isCurrentRow ? this.props.activatePeg : null}/>
      <label htmlFor={this.props.idVal}></label>
    </span>
    );
  }
}
