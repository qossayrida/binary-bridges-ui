import type { JSX } from 'react';
import { HomePage } from '../pages/HomePage.tsx';
import { AuthorsPage } from '../pages/AuthorsPage.tsx';
import { BooksPage } from '../pages/BooksPage.tsx';
import { SalesPage } from '../pages/SalesPage.tsx';

interface AppRoute {
    path: string;
    label: string;
    icon: string;
    element: JSX.Element;
    badge?: string;
}

export const appRoutes: AppRoute[] = [
    {
        label: 'Home',
        icon: '🏠',
        path: '/home',
        element: <HomePage />
    },
    {
        label: 'Authors',
        icon: '✍️',
        path: '/author',
        element: <AuthorsPage />
    },
    {
        label: 'Books',
        icon: '📖',
        path: '/book',
        element: <BooksPage />
    },
    {
        label: 'Sales',
        icon: '💰',
        path: '/sale',
        element: <SalesPage />
    }
];
