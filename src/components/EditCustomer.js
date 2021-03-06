import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClickOpen = () => {
    console.log(props);
    setCustomer(props.customer);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.updateCustomer(props.url, customer);
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First name"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last name"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Street address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Post code"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="E-mail"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSave} color="primary">
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCustomer;