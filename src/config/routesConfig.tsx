import type { JSX } from 'react';
import { FaHome, FaUserEdit, FaBook, FaDollarSign } from 'react-icons/fa';
import React, {lazy} from "react";

const HomePage = lazy(() => import('../pages/home/HomePage.tsx'));
const AuthorsPage = lazy(() => import('../pages/author/AuthorsPage.tsx'));
const BooksPage = lazy(() => import('../pages/book/BooksPage.tsx'));
const SalesPage = lazy(() => import('../pages/sale/SalesPage.tsx'));


const AuthorsAddPage = lazy(() => import('../pages/author/AuthorAddPage.tsx'));

interface AppRoute {
    path: string;
    label: string;
    icon?: JSX.Element;
    element: JSX.Element;
    badge?: string;
}

export const appRoutes: AppRoute[] = [
    {
        label: 'Home',
        icon: <FaHome />,
        path: '/home',
        element: <HomePage />,
    },
    {
        label: 'Authors',
        icon: <FaUserEdit />,
        path: '/author',
        element: <AuthorsPage />,
    },
    {
        label: 'Add new author',
        path: '/author/add',
        element: <AuthorsAddPage />,
    },
    {
        label: 'Books',
        icon: <FaBook />,
        path: '/book',
        element: <BooksPage />,
    },
    {
        label: 'Sales',
        icon: <FaDollarSign />,
        path: '/sale',
        element: <SalesPage />,
    }
];
