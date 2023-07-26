import TopNavbar from '@/components/top-navbar';
import Footer from '@/components/footer';

import '../styles/globals.scss';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Personal Site',
  description: `
    I am Ryan O'Connor, and this is my personal website.
    This is where I keep my portfolio, programming projects, and resume as well as my blog
    and an image gallery for all of my woodworking projects.
  `,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Added no-js class in order to load different SCSS if Javascript is on or not. */}
      <body className={`${inter.className} no-js`}>
        <TopNavbar />

        <div id="main-page-wrapper">
          {children}
        </div>
        
        <Footer />
        {/* Added JS script for ALL pages that removes the no-js class from the body*/}
        <Script id="root-script"
          dangerouslySetInnerHTML={{
            __html: `
            document.body.classList.remove("no-js"); //remove no-js class
            `
          }}
        />

      </body>
    </html>
  )
}
