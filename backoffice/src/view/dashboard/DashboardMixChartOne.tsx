import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { i18n } from 'src/i18n';
import ProduitService from 'src/modules/produit/produitService';

export default function DashboardMixChartOne(props) {

  const [stock, setStock] = useState(['']);
  const [title, setTitle] = useState(['']);

  const filter = { stockable: true }

  let arrayStock = [''];
  let arrayTitle = [''];
  useEffect(() => {
    ProduitService.list(filter, '', '', '',).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        arrayStock[i] = res.rows[i].stock;
        arrayTitle[i] = res.rows[i].titre;
      }
      setStock(arrayStock);
      setTitle(arrayTitle);
    });
  }, []);

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        { barPercentage: 0.5 },
        {
          display: false,
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
          },
          ticks: {
            beginAtZero: true
          }
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  const data1 = {
    labels: title,
    datasets: [
      {
        type: 'bar',
        label: i18n('entities.produit.menu'),
        data: stock,
        fill: false,
        backgroundColor: '#c73c32',
        borderColor: '#c73c32',
        pointHoverBackgroundColor: '#c73c32',
        pointHoverBorderColor: '#c73c32',
        yAxisID: 'y-axis-1',
      },
    ],
  };
  return <Bar data={data1} options={options} />;
}
