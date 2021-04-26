import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from "moment";


function TrainingsList() {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const dateFormatter = (params) => {
    return moment(params.value).format('DD/MM/YYYY');
  }

  const fullName = (params) => {
    return params.data.customer.firstname + ' ' + params.data.customer.lastname;
  }

  const sizeToFit = () => {
    gridOptions.api.sizeColumnsToFit();
  }

  const columns = [
    { field: 'activity', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true , suppressSizeToFit: true, width: 150 },
    { field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter },
    { field: 'customer', sortable: true, filter: true, headerName: 'Customer', valueGetter: fullName }
  ];

  const gridOptions = {
    // PROPERTIES
    rowData: trainings,
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
    <div className="ag-theme-material" style={{ width: '50%', margin: 'auto' }}>
      <AgGridReact
        gridOptions={gridOptions}
      />
    </div>
  );
}

export default TrainingsList;