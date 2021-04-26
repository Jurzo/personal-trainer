import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SnackBar from '@material-ui/core/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import AddCustomer from "./AddCustomer";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [selection, setSelection] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openSnackBar = () => {
    setOpen(true);
  }

  const closeSnackBar = () => {
    setOpen(false);
  }

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.content);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type': 'application/json' }
      })
      .then(_ => fetchCustomers())
      .catch(err => console.error(err))
  }

  const updateCustomer = (url, customer) => {
    fetch(url,
      {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: { 'Content-type': 'application/json' }
      })
      .then(_ => fetchCustomers())
      .catch(err => console.error(err))
  }

  const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchCustomers();
            setSnackMessage("Customer deleted");
            openSnackBar();
          }
          else
            alert('Something went wrong in deletion');
        })
        .catch(err => console.error(err))
    }
  }

  const addTraining = (training) => {
    console.log(training);
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        body: JSON.stringify(training),
        headers: { 'Content-type': 'application/json' }
      })
      .then(_ => {
        setSnackMessage("Training added");
        setOpen(true);
      })
      .catch(err => console.error(err))
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
    { field: 'phone', sortable: true, filter: true , suppressSizeToFit: true, width: 190 },
    {
      headerName: '',
      field: 'links',
      width: 140,
      valueGetter: (params) => params.data.links[0].href,
      cellRendererFramework: params =>
        <EditCustomer customer={params.data} url={params.value} updateCustomer={updateCustomer} />
    },
    {
      headerName: '',
      field: 'link',
      width: 100,
      valueGetter: (params) => params.data.links[0].href,
      cellRendererFramework: params =>
        <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
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
    rowSelection: 'single',

    // EVENTS
    onRowClicked: event => setSelection(event.data),
    onGridReady: _ => sizeToFit()
  }

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <AddTraining
        url={selection.links?.[0].href}
        name={selection.firstname + ' ' + selection.lastname}
        addTraining={addTraining}
      />
      <div className="ag-theme-material" style={{ width: '65%', margin: 'auto'}}>
        <AgGridReact
          //rowData piti siirtää tänne, että lista päivittyy
          rowData={customers}
          gridOptions={gridOptions}
        />
      </div>
      <SnackBar
        open={open}
        message={snackMessage}
        autoHideDuration={3000}
        onClose={closeSnackBar}
      />
    </div>
  );
}

export default CustomerList;