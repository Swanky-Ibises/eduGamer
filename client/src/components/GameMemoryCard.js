import { Table } from 'semantic-ui-react';

const GameMemoryCard = (props) => {
  return (
    <Table.Cell textAlign='center' onClick={() => props.onClick(props.index)}>
      {/*<p>{props.index}</p>*/}
      {props.card.flipped ? props.card.value : ' '}
    </Table.Cell>
  );
};

export default GameMemoryCard;