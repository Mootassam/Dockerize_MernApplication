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
export default function DashboardLineChart(props) {

  const [outMoves, setOutMoves] = useState(['']);
  const [index, setIndex] = useState([0]);
  let arrayOutMoves = [''];
  let arrayIndex = [0];
  const filterOut = { typeMouv: "sortie" }
  useEffect(() => {
    MouvementsService.list(filterOut, '', '', '',).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        arrayOutMoves[i] = res.rows[i].montant;
        arrayIndex[i] = i + 1;
      }
      setOutMoves(arrayOutMoves);
      setIndex(arrayIndex);
    });
  }, []);

  const data = {
    labels: index,
    datasets: [
      {
        label: i18n('entities.mouvements.enumerators.typeMouv.sortie'),
        type: 'line',
        data: outMoves,
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-1',
      },
    ],
  };

  return <Line data={data} options={options} />;
}
