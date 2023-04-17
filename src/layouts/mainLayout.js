import { Layout } from "antd";
import Head from "next/head";
import mainStyle from '@/styles/main.module.css'

export default function MainLayout({ children }) {
  const { Header, Content } = Layout;

  return (
    <>
      <Head>
        <title>Unicorn Web App</title>
        <meta name="description" content="Page description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Header className={mainStyle.header}>
            <h1>Unicorn</h1>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </main>
    </>
  )
}
