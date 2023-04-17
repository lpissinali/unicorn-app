import { Inter } from 'next/font/google';
import MainLayout from '@/layouts/mainLayout';
import {Avatar, Button, Card, Col, Row, Space} from 'antd';
import { AlignLeftOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import mainStyle from '@/styles/main.module.css'
import { useEffect, useState } from 'react';
import { Chart } from 'chart.js';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    // Load token data
    fetch('https://api.coronavirus.data.gov.uk/v1/data')
      .then((res) => res.json())
      .then((data) => {
        setCovidData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: [66, 144, 146, 116, 107, 131, 43],
          label: "Applied",
          borderColor: "rgb(109, 253, 181)",
          backgroundColor: "rgb(109, 253, 181,0.5)",
          borderWidth: 2
        }, {
          data: [40, 100, 44, 70, 63, 30, 10],
          label: "Accepted",
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgb(75, 192, 192,0.5)",
          borderWidth: 2
        }, {
          data: [20, 24, 50, 34, 33, 23, 12],
          label: "Pending",
          borderColor: "rgb(255, 205, 86)",
          backgroundColor: "rgb(255, 205, 86,0.5)",
          borderWidth: 2
        }, {
          data: [6, 20, 52, 12, 11, 78, 21],
          label: "Rejected",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgb(255, 99, 132,0.5)",
          borderWidth: 2
        }
        ]
      },
    });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('circleChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Accepted", "Pending", "Rejected"],
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
            <h2>England COVID stats</h2>
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
                <Avatar size={25} src={<img src="./avatar.webp" alt="avatar" />} />,
                <AlignLeftOutlined key="notes" />,
              ]}>
              <canvas id="barChart"></canvas>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="People tested positive in England"
              actions={[
                <Avatar size={25} src={<img src="./avatar.webp" alt="avatar" />} />,
                <AlignLeftOutlined key="notes" />,
              ]}>
              <canvas id="circleChart"></canvas>
            </Card>
          </Col>
        </Row>
      </Space>
    </MainLayout>
  )
}
