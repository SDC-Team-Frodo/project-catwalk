import React from 'react';

const TableEntry = (props) => {
  const { keys, array } = props;
  let [overview, card] = array;

  if (overview === true) {
    overview = <i className="fas fa-check" />;
  }
  if (card === true) {
    card = <i className="fas fa-check" />;
  }

  return (
    <tr>
      <td>{overview}</td>
      <td>{keys}</td>
      <td>{card}</td>
    </tr>
  );
};

export default TableEntry;
