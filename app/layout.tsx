import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Patient Directory App',
	description: 'Professional patient management system with search, filter, and sort capabilities',
	generator: 'Next.js',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
			</body>
		</html>
	);
}
