import React from 'react';
import {Link} from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className="data-page">
            <div className="page-container">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content-wrapper">
                        <h1 className="page-title">Welcome to Binary Bridges</h1>
                    </div>
                </div>

                <p style={{color: 'black'}} className="page-description">
                    This system helps you manage authors, books, and sales with ease. Use the navigation below to
                    get started.
                </p>
                <div className="page-links">
                    <ul>
                        <li>
                            <Link to="/author">Manage Authors</Link>
                        </li>
                        <li>
                            <Link to="/book">Manage Books</Link>
                        </li>
                        <li>
                            <Link to="/sale">Manage Sales</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
