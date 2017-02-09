const GameMemoryCard = (props) => {
  return (
    <td onClick={() => props.onClick(props.index)}>
      <p>{props.index}</p>
      {props.card.flipped ? props.card.value : ''}
    </td>
  );
};

export default GameMemoryCard;