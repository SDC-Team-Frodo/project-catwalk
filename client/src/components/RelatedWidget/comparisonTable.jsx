import React from 'react';
import TableEntry from './tableEntry';

const ComparisonTable = (props) => {
  const { overviewName, cardName, combined } = props;
  return (
    <table className="compareContent">
      <thead>
        <tr className="compareTr">
          <th className="compareTh compareColumns">{overviewName}</th>
          <th className="compareTh compareColumns">Characteristics</th>
          <th className="compareTh compareColumns">{cardName}</th>
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
