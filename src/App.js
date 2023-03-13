import React, { useState } from 'react';
import Table from './Table';
import {exportData} from './data'

const App = () => {
const [data, setData] = useState([...exportData]);


    return (
      <>
      {data !== null && (
        <Table data={data} pageSize={10} setData={setData}  initialSortKey="id" />
      )}
      </>
       
    )
}

export default App;