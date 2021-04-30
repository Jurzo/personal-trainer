import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';

function Statistics() {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(()=> {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainingData(parseData(data));
      })
      .catch(err => console.log(err));
  }

  const parseData = (data) => {
    let parsed = [];
    data.forEach(element => {
      const activity = element.activity;
      for (let i = 0, item; item = parsed[i]; i++) {

        if (item.name === activity) {
          item.duration += element.duration;
          return;
        }
      }
      parsed.push({name: activity, duration: element.duration});
    });
    return parsed;
  }

  return (
    <div style={{ width: '65%', height: '700px', margin: 'auto' , marginTop: '50px'}}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={trainingData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default Statistics;