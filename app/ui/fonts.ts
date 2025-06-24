import { Inter } from 'next/font/google';
import { Fira_Code } from 'next/font/google';
import { Lusitana } from 'next/font/google';

export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter',
});

export const firaCode = Fira_Code({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-fira-code'
});

export const lusitana = Lusitana({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-lusitana'
});