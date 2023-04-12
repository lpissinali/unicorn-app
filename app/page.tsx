"use client"
import styles from './page.module.css'
import 'antd/dist/reset.css';
import { Layout, Space } from "antd";

const { Header, Content } = Layout;


export default function Home() {
  return (
    <main className={styles.main}>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header className={styles.header}>
                    Unicorn
                </Header>
                <Content className={styles.content}>
                    Content
                </Content>
            </Layout>
        </Space>
    </main>
  )
}
