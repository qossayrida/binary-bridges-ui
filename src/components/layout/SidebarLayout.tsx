import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { appRoutes } from '../../config/routesConfig.tsx';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';
import Footer from './Footer';

export const SidebarLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/auth');
        setDropdownOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const getCurrentPageTitle = () => {
        const currentRoute = appRoutes.find(route => route.path === location.pathname);
        return currentRoute ? currentRoute.label : 'Dashboard';
    };

    return (
        <div className="sidebar-layout-container">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <span className="logo-icon">🎓</span>
                    {!sidebarCollapsed && <span> Binary Bridges</span>}
                    <button
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                    >
                        {sidebarCollapsed ? '→' : '←'}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {appRoutes.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                title={sidebarCollapsed ? item.label : undefined}
                            >
                                <span className="sidebar-nav-icon">{item.icon}</span>
                                {!sidebarCollapsed && (
                                    <>
                                        <span className="sidebar-nav-label">{item.label}</span>
                                        {item.badge && (
                                            <span className="sidebar-nav-badge">{item.badge}</span>
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                {!sidebarCollapsed && <Footer />}
            </aside>

            {/* Main Content Area */}
            <main className="sidebar-main-content">
                {/* Header */}
                <header className="sidebar-main-header sidebar-fade-in">
                    <div className="sidebar-breadcrumb">
                        <span className="sidebar-breadcrumb-icon">📍</span>
                        <span>Current Page:</span>
                        <span className="sidebar-breadcrumb-path">{getCurrentPageTitle()}</span>
                        <span className="sidebar-breadcrumb-pathname">
                            ({location.pathname})
                        </span>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="sidebar-settings-dropdown" ref={dropdownRef}>
                        <Button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            variant="primary"
                            size="sm"
                            icon="⚙️"
                        >
                            Settings
                        </Button>

                        {dropdownOpen && (
                            <div className="sidebar-dropdown-menu sidebar-fade-in">
                                <button className="sidebar-dropdown-item">
                                    <span>👤</span>
                                    <span>Profile</span>
                                </button>
                                <button className="sidebar-dropdown-item">
                                    <span>🔔</span>
                                    <span>Notifications</span>
                                </button>
                                <button className="sidebar-dropdown-item">
                                    <span>🎨</span>
                                    <span>Preferences</span>
                                </button>
                                <hr className="sidebar-dropdown-divider" />
                                <button
                                    className="sidebar-dropdown-item danger"
                                    onClick={handleLogout}
                                >
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="sidebar-content-area">
                    <div className="sidebar-content-card sidebar-fade-in">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;
