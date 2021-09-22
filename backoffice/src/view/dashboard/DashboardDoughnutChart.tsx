import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { i18n } from 'src/i18n';
import CampagneService from 'src/modules/campagne/campagneService';

export default function DashboardDoughnutChart(props) {

  const [adherents, setAdherents] = useState(['']);
  const [title, setTitle] = useState(['']);
  const [colors, setColors] = useState(['']);

  let arrayAdherent = [''];
  let arrayTitle = [''];
  let arrayColors = [''];
  useEffect(() => {
    CampagneService.list('', '', '', '',).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        arrayAdherent[i] = res.rows[i].details.length;
        arrayTitle[i] = res.rows[i].titre;
        arrayColors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
      setAdherents(arrayAdherent);
      setTitle(arrayTitle);
      setColors(arrayColors);
    });
  }, []);

  let data = { 
    labels: title,
    datasets: [
      {
        data: adherents,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  let options={
    legend: { display: true, position: "right" },
    title: {
      display: true,
      text: i18n('entities.campagne.menu'),
    }
  }
  return <Doughnut data={data} options={options} />;
}
