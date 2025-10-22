import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MB Customer service",
  description: "MB Customer service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="apple-mobile-web-app-title" content="My App" />
  <meta name="apple-mobile-web-app-capable" content="yes" /> 
  <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />        
  <meta name="auth-token" content="" />

 <meta name="viewport" content="viewport-fit=cover,width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
 
<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
  <meta name="theme-color" content="#2196f3" />
<link rel="stylesheet" href="/build/csscore.css" />
           <link rel="stylesheet" href="/build/app.min.css" />
    <link rel="stylesheet" href="/build/font.css" />

         <Script src="/build/jscore.js" strategy="beforeInteractive" /> 
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased style1`}
      >
        <div className="loadingabc"></div>
        {children}
      </body>
    </html>
  );
}
