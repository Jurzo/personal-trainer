import './App.css';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import { useState } from 'react';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';

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
          <Tab value="calendar" label="Calendar" />
          <Tab value="statistics" label="Statistics" />
        </Tabs>
      </AppBar>
      {current === 'customers' ? <CustomerList /> : null}
      {current === 'trainings' ? <TrainingsList /> : null}
      {current === 'calendar' ? <Calendar /> : null}
      {current === 'statistics' ? <Statistics /> : null}
    </div>
  );
}

export default App;
