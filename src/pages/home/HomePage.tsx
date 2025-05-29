import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx'; // Import useAuth

export const HomePage = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context

    return (
        <div className="data-page">
            <div className="page-container">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content-wrapper">
                        <h1 className="page-title">Welcome to Binary Bridges</h1>
                        {user && ( // Display user info if logged in
                            <div className="user-info" style={{ marginTop: '10px', textAlign: 'right', color: 'black' }}>
                                <img src={user.imageUrl} alt={user.username} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px', verticalAlign: 'middle' }} />
                                <span>Welcome, {user.username}! ({user.email})</span>
                                <button onClick={logout} style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
                                {/* Optionally display UUID if needed, maybe less prominent */}
                                {/* <p style={{ fontSize: '0.8em', color: '#666' }}>UUID: {user.uuid}</p> */}
                            </div>
                        )}
                    </div>
                </div>

                <p style={{ color: 'black' }} className="page-description">
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

export default HomePage;

