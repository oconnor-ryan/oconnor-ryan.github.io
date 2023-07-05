import TopNavbar from '@/components/top-navbar'
import Footer from '@/components/footer'

import '../styles/globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNavbar />

        <div id="main-page-wrapper">
          {children}
        </div>
        
        <Footer />
        </body>
    </html>
  )
}
