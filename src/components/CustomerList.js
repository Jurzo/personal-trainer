import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.content);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const sizeToFit = () => {
    gridOptions.api.sizeColumnsToFit();
  }

  const columns = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true }
  ];

  const gridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    rowData: customers,
    columnDefs: columns,
    pagination: true,
    rowSelection: 'single',
    domLayout: 'autoHeight',

    // EVENTS
    // Add event handlers
    onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => sizeToFit(),
  }

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="ag-theme-material" style={{ width: '65%', margin: 'auto'}}>
      <AgGridReact
        gridOptions={gridOptions}
      />
    </div>
  );
}

export default CustomerList;