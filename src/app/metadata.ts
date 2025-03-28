// src/app/metadata.ts
import { Metadata } from 'next'

const pocketedMetadata: Metadata = {
    title: {
        default: 'Pocketed - Smart Finance Management',
        template: '%s | Pocketed'
    },
    description: 'Academic project from ETIC Algarve - Personal finance tracking application',
    keywords: [
        'finance app',
        'expense tracker',
        'budgeting tool',
        'ETIC Algarve project',
        'money management'
    ],
    authors: [{ name: 'Mccartheney', url: 'https://github.com/mccartheney' }],
    creator: 'Mccartheney',
    publisher: 'ETIC Algarve',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://pocketed.vercel.app',
        siteName: 'Pocketed',
        title: 'Pocketed - Smart Finance Management',
        description: 'Academic project from ETIC Algarve - Personal finance tracking application',
        images: [
            {
                url: '/public/images/wallet.svg',
                width: 1200,
                height: 630,
                alt: 'Pocketed Finance App',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pocketed - Smart Finance Management',
        description: 'Academic project from ETIC Algarve - Personal finance tracking application',
        images: ['/wallet.svg'],
        },
        icons: {
            icon: '/wallet.svg',
        },
    manifest: '/site.webmanifest'
}

export default pocketedMetadata