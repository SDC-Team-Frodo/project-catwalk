import React from 'react';
import TableEntry from './tableEntry';

const ComparisonTable = (props) => {
  const { overviewName, cardName, combined } = props;
  return (
    <table className="compareContent">
      <thead>
        <tr>
          <th>{overviewName}</th>
          <th>Characteristics</th>
          <th>{cardName}</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(combined).map((keys, i) => <TableEntry key={`${keys}${i}`} keys={keys} array={combined[keys]} />)
        }
      </tbody>
    </table>

  );
};

export default ComparisonTable;
