import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { i18n } from 'src/i18n';
import MouvementsService from 'src/modules/mouvements/mouvementsService';

const options = {
  title: {
    display: true,
    text: i18n('entities.mouvements.menu'),
  },
  scales: {
    xAxes: [
      {
        display: true,
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
      },
    ],
  },
};

export default function DashboardMixChartTwo(props) {

  const [inMoves, setInMoves] = useState(['']);
  const [index, setIndex] = useState([0]);
  let arrayInMoves = [''];
  let arrayIndex = [0];
  const filterIn = { typeMouv: "entree" }

  useEffect(() => {
    MouvementsService.list(filterIn, '', '', '',).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        arrayInMoves[i] = res.rows[i].montant;
        arrayIndex[i] = i + 1;
      }
      setInMoves(arrayInMoves);
      setIndex(arrayIndex);
    });
  }, []);

  const data2 = {
    labels: index,
    datasets: [
      {
        type: 'line',
        label: i18n('entities.mouvements.enumerators.typeMouv.entree'),
        data: inMoves,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        yAxisID: 'y-axis-1',
      },
    ],
  };
  return <Line data={data2} options={options} />;
}
