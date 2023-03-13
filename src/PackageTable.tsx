
import React, { useState, useEffect, useMemo} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import cellEditFactory from 'react-bootstrap-table2-editor';

interface Column {
  dataField: string;
  text: string;
  sort: boolean;
  hidden: boolean;
}

export const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const options = {};

  

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
   const { data: response } = await axios('https://jsonplaceholder.typicode.com/comments');
   setData(response);
   const columnIds = Object.keys(response[0]);
   const refactoredColumns = columnIds.map((columnId)=> {
    return { dataField: columnId, text: columnId.toLocaleUpperCase(), sort: true, hidden: false}
  });
   setColumns(refactoredColumns);
  }

  const filterColumn = (index: number, value: boolean) => {
    const duplicateData = [...columns];
    duplicateData[index]['hidden'] = value;
    setColumns(duplicateData);
  }


    return (
      <div className='row'>
        <div className='col-md-2 padding-left'>
        </div>
        <div className='col-md-10'>
          {columns.length > 0 &&
          <BootstrapTable  
            keyField="id" 
            data={data} 
            columns={columns} 
            pagination={paginationFactory(options)} 
            striped 
            hover 
            condensed
            cellEdit={cellEditFactory({
              "mode": "dbclick",
              blurToSave: true,
            })}
          />
          }
        </div>
      </div>
    )
  }

  
export default App
