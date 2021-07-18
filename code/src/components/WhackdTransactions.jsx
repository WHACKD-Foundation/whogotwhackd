import { useEffect, useState } from 'react'
import { useInterval } from '@usedapp/core'
import { DataGrid } from '@material-ui/data-grid';
import { getWhackdTransactions } from './providers/whackd-tx-provider';

const columns = [
  {
    field: 'transactionId',
    headerName: 'Transaction ID',
    width: 150,
  },
  {
    field: 'value',
    headerName: 'WHACKD amount',
    type: 'number',
    width: 110,
  },
  { field: 'timestamp',
    headerName: "Timestamp",
    type: 'datetime',
    width: 200,
  }
];

export default function WhackdTransactions() {
  let [whackdTxList, setTxList] = useState([])

  const handleTxListChange = w => {
    console.log(w)
    setTxList(w)
  }

  useInterval(() => {
    getWhackdTransactions(handleTxListChange)
  }, 1000000)

  useEffect(() => {
    getWhackdTransactions(handleTxListChange)
  }, [])

  return (
    <div style={{ height: 600, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={whackdTxList}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
}
