import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SnackBar from '@material-ui/core/Snackbar';
import moment from "moment";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TrainingsList(props) {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const openSnackBar = () => {
    setOpen(true);
  }

  const closeSnackBar = () => {
    setOpen(false);
  }

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id,
        { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchTrainings();
            openSnackBar();
          }
          else
            alert('Something went wrong in deletion');
        })
        .catch(err => console.error(err))
    }
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
    { field: 'duration', sortable: true, filter: true, suppressSizeToFit: true, width: 150 },
    { field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter },
    { field: 'customer', sortable: true, filter: true, valueGetter: fullName },
    {
      headerName: '',
      field: 'id',
      width: 100,
      cellRendererFramework: params =>
        <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
          <DeleteIcon />
        </IconButton>
    }
  ];

  const gridOptions = {
    // PROPERTIES
    columnDefs: columns,
    pagination: true,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressCellSelection: true,
    paginationPageSize: 10,

    // EVENTS
    onGridReady: _ => sizeToFit()
  }

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <div className="ag-theme-material" style={{ width: '50%', margin: 'auto' }}>
        <AgGridReact
          gridOptions={gridOptions}
          rowData={trainings}
        />
      </div>
      <SnackBar
        open={open}
        message='Training deleted'
        autoHideDuration={3000}
        onClose={closeSnackBar}
      />
    </div>
  );
}

export default TrainingsList;