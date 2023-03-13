import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import MyPagination from './Pagination'

interface TableProps {
  data: Data[];
  pageSize?: number;
  initialSortKey?: string;
  setData: (data: Data[]) => void;
}

interface Column {
  key: string;
  hidden: boolean;
}

interface Data {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width: number;
  [key: string]: string | number;
}


interface EditedData {
  id: string;
  [key: string]: any;
}

const Table = ({ data, pageSize = 10, initialSortKey, setData }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] =useState(initialSortKey);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editedData, setEditedData] = useState<EditedData[]>([]);
  const [columns, setColumns] =  useState<Column[]>([]);
  
  useEffect(() => {
    getColumns();
  },[data]);

  const getColumns = () => {
    const columnIds: string[] = Object.keys(data[0]);
    const refactoredColumns = columnIds.map((column, index)=> {
     return { key: column, hidden: false };
   });
   setColumns(refactoredColumns);
  }


  const sortedData = data.sort((a, b) => (
    a[sortKey!] < b[sortKey!] ? (sortDirection === 'asc' ? -1 : 1) :
    a[sortKey!] > b[sortKey!] ? (sortDirection === 'asc' ? 1 : -1) : 0
));

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedData = sortedData.slice(startIndex, endIndex);


  const pageCount = Math.ceil(data.length / pageSize);

  const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
  };

  const handleCellChange = (value: string, row: { [key: string]: any }, column: Column) => {
    const newData = data.map(d => {
      if (d === row) {
        return {
          ...d,
          [column.key]: value
        };
      } else {
        return d;
      }
    });
    setEditedData([...editedData, { id: row.id, [column.key]: value }]);
   setData(newData);
  };

  const filterColumn = (index: number, value: boolean) => {
    const duplicateData = [...columns];
    duplicateData[index]['hidden'] = value;
    setColumns(duplicateData);
  }

  return (
    <>
    <Header />
      {columns.length > 0 && (
        <div className="row">
            <div className='col-md-1 padding-left'>
              <h4>Filter Column</h4> <hr />
              {columns.map((column, index) => {
                return (<Form.Check
                  reverse
                  label={column.key}
                  name="group1"
                  type="checkbox"
                  defaultChecked={!column.hidden}
                  onClick={() => filterColumn(index, !column.hidden)}
                />
                )
              })}
            </div>
            <div className='col-md-11'>
              <table className='table table-striped table-condensed table-hover'>
                <thead>
                  <tr>
                    {columns.map((column, columnIndex) => {
                      if(column.hidden === false) {
                      return (
                      <th key={columnIndex} onClick={() => handleSort(column.key)}>
                        {column.key}
                        {sortKey === column.key && (
                          <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                      </th>
                    )}}
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, rowIndex) =>
                  { 
                    console.log('row', row)
                    return (
                    <tr key={rowIndex}>
                      {columns.map((column, columnIndex) => {
                          if(column.hidden === false) {
                        return (
                        <td key={columnIndex}>
                          {editedData.some(editedRow => editedRow.id === row.id && editedRow[column.key]) ? (
                            <input
                              type="text"
                              value={editedData.find(editedRow => editedRow.id === row.id)![column.key]}
                              onChange={(e) => handleCellChange(e.target.value, row, column)}
                              style={{width: '100%'}}
                            />
                          ) : (
                            <span
                              onClick={() => {
                                setEditedData(editedData.filter(editedRow => editedRow.id !== row.id));
                              }}
                              onDoubleClick={() => {
                                setEditedData([...editedData, { id: row.id, [column.key]: row[column.key] }]);
                              }}
                            >
                              {row[column.key]} 
                            </span>
                          )}
                        </td>
                      )}})}
                    </tr>
                  )})}
                </tbody>
              </table>
              <div>
                {<MyPagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
              </div>
            </div>
        </div>
      )}
    </>
  );
}
export default Table