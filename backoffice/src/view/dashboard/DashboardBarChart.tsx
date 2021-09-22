import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { i18n } from 'src/i18n';
import ProjetService from 'src/modules/projet/projetService';

export default function DashboardBarChart(props) {
  const options = {
    legend: {
      display: true,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true
          }
        },
      ],
    },
  };

  const [budget, setBudget] = useState(['']);
  const [title, setTitle] = useState(['']);

  let arrayBudget = [''];
  let arrayTitle = [''];
  useEffect(() => {
    ProjetService.list('', '', '', '',).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        arrayBudget[i] = res.rows[i].budget;
        arrayTitle[i] = res.rows[i].titre;
      }
      setBudget(arrayBudget);
      setTitle(arrayTitle);
    });
  }, []);

  const data = {
    labels: title,
    datasets: [
      {
        label: i18n('entities.projet.menu'),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: budget,
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={options}
      width={100}
      height={50}
    />
  );
}

