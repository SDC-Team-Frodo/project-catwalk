import React from 'react';
import TableEntry from './tableEntry';

const ComparisonTable = (props) => {
  const { overviewName, productName, combined } = props;
  return (
    <table className="compareContent">
      <thead>
        <tr>
          <th>{overviewName}</th>
          <th>Characteristics</th>
          <th>{productName}</th>
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
