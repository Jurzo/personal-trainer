import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  const fullName = (params) => {
    return params.data.firstname + ' ' + params.data.lastname;
  }

  const fullAddress = (params) => {
    return params.data.city + ', ' + params.data.postcode + ', ' + params.data.streetaddress;
  }

  const columns = [
    { field: 'customer', sortable: true, filter: true, headerName: 'Customer', valueGetter: fullName },
    { field: 'address', sortable: true, filter: true, valueGetter: fullAddress  },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true , suppressSizeToFit: true, width: 190 }
  ];

  const gridOptions = {
    // PROPERTIES
    rowData: customers,
    columnDefs: columns,
    pagination: true,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressCellSelection: true,

    // EVENTS
    onRowClicked: _ => console.log('A row was clicked'),
    onGridReady: _ => sizeToFit()
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