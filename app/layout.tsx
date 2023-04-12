import './globals.css'

export const metadata = {
  title: 'Unicorn Web App',
  description: 'Page description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
