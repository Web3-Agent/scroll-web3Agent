import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
    width: "device-width",
    initialScale: 1.0,
};

export const metadata: Metadata = {
    title: "Web3Agent Frames",
    description: "NextGen AI Powered",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
