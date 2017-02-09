const GameMemoryCard = (props) => {
  return (
    <td>
      {props.card.flipped ? props.card.value : ''}
      <p>{props.index}</p>
    </td>
  );
};

export default GameMemoryCard;