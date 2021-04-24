import './App.css';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import { useState } from 'react';

function App() {
  const [current, setCurrent] = useState('customers');

  return (
    <div>
      <AppBar position="static">
        <Tabs 
          value={current} 
          onChange={(_,value) => setCurrent(value)}
          centered={true}
        >
          <Tab value="customers" label="Customers" />
          <Tab value="trainings" label="Trainings" />
        </Tabs>
      </AppBar>
      {current === 'customers' ? <CustomerList /> : null}
      {current === 'trainings' ? <TrainingsList /> : null}
    </div>
  );
}

export default App;
