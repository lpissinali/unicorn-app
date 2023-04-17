import MainLayout from '@/layouts/mainLayout';
import {Avatar, Button, Card, Col, Image, Row, Space} from 'antd';
import { AlignLeftOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import mainStyle from '@/styles/main.module.css'
import { useEffect, useState } from 'react';
import { Chart } from 'chart.js';

export default function Home() {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    // Load token data
    fetch('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate","newDeaths28DaysByDeathDate":"newDeaths28DaysByDeathDate"}')
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setCovidData(data.data.slice(0, 7).reverse());
        });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const filteredData = [];
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: covidData.map(item => (
            item.date
        )),
        datasets: [{
          data: covidData.map(item => (
              item.newDeaths28DaysByDeathDate
          )),
          label: "Daily Deaths",
          backgroundColor: [
            "rgb(75, 192, 192 )"
          ],
        }
        ]
      },
    });
  }, [covidData]);

  useEffect(() => {
    const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Unvaccinated", "1st dose", "2nd dose"],
        datasets: [{
          data: [70, 10, 6],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
          ],
          backgroundColor: [
            "rgb(75, 192, 192 )",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
          ],
          borderWidth: 2,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
          }],
          yAxes: [{
            display: false,
          }],
        }
      },

    });
  }, []);

  return (
    <MainLayout>
      <Space className={mainStyle.mainBody} direction='vertical' size={10} align='baseline'>
        <div className={mainStyle.headerSection}>
          <div>
            <h3>England COVID stats</h3>
          </div>
          <div className={mainStyle.toolbarSection}>
            <Button icon={<DownloadOutlined />}>
              Export to PDF
            </Button>
            <Button icon={<AlignLeftOutlined />}>
              Notes <span>(3)</span>
            </Button>
            <Button icon={<FilterOutlined />}>
              Filter <span>9+</span>
            </Button>
          </div>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Daily death by COVID-19 in England"
              actions={[
                <Avatar key={'avatar'} size={25} src={<Image src="./avatar.webp" alt="avatar" />} />,
                <AlignLeftOutlined key="notes" />,
              ]}>
              <canvas id="lineChart"></canvas>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="People tested positive in England"
              actions={[
                <Avatar key={'avatar'} size={25} src={<Image src="./avatar.webp" alt="avatar" />} />,
                <AlignLeftOutlined key="notes" />,
              ]}>
              <canvas id="barChart"></canvas>
            </Card>
          </Col>
        </Row>
      </Space>
    </MainLayout>
  )
}
