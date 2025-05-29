import React, {useState, useRef, useEffect} from 'react';
import {useLocation, useNavigate, Outlet} from 'react-router-dom';
import {appRoutes} from '../../config/routesConfig.tsx';
import {useAuth} from '../../context/AuthContext';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {HiAcademicCap} from 'react-icons/hi';
import {Button} from '../ui';
import Footer from './Footer';
import {FiUser, FiBell, FiSettings, FiLogOut} from 'react-icons/fi';

export const SidebarLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {logout} = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Check if screen is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            // Close mobile menu when switching to desktop
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobile && mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, mobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/auth');
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    };

    const toggleSidebar = () => {
        if (isMobile) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const getCurrentPageTitle = () => {
        const currentRoute = appRoutes.find(route => route.path === location.pathname);
        return currentRoute ? currentRoute.label : 'Dashboard';
    };

    const handleNavItemClick = (path: string) => {
        navigate(path);
        if (isMobile) {
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="sidebar-layout-container">
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    className="sidebar-mobile-menu-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>
            )}

            {/* Mobile Overlay */}
            {isMobile && (
                <div
                    className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${isMobile && mobileMenuOpen ? 'mobile-open' : ''}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <span className="logo-icon">
                        <HiAcademicCap/>
                    </span>
                    {(!sidebarCollapsed || isMobile) && <span> Binary Bridges</span>}
                    {!isMobile && (
                        <button
                            className="sidebar-toggle"
                            onClick={toggleSidebar}
                            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {sidebarCollapsed ? '→' : '←'}
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {appRoutes.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavItemClick(item.path)}
                                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                title={(!isMobile && sidebarCollapsed) ? item.label : undefined}
                            >
                                <span className="sidebar-nav-icon">{item.icon}</span>
                                {(!sidebarCollapsed || isMobile) && (
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

                {(!sidebarCollapsed || isMobile) && <Footer/>}
            </aside>

            {/* Main Content Area */}
            <main className="sidebar-main-content">
                {/* Header */}
                <header className="sidebar-main-header sidebar-fade-in">
                    <div className="sidebar-breadcrumb">
                        <span className="sidebar-breadcrumb-icon">
                            <FaMapMarkerAlt/>
                        </span>
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
                            icon={<FiSettings/>}
                        >

                            {!isMobile && 'Settings'}
                        </Button>

                        {dropdownOpen && (

                            <div className="sidebar-dropdown-menu sidebar-fade-in">
                                <button className="sidebar-dropdown-item">
                                    <FiUser style={{marginRight: '8px'}}/>
                                    <span>Profile</span>
                                </button>
                                <button className="sidebar-dropdown-item">
                                    <FiBell style={{marginRight: '8px'}}/>
                                    <span>Notifications</span>
                                </button>
                                <button className="sidebar-dropdown-item">
                                    <FiSettings style={{marginRight: '8px'}}/>
                                    <span>Preferences</span>
                                </button>
                                <hr className="sidebar-dropdown-divider"/>
                                <button
                                    className="sidebar-dropdown-item danger"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut style={{marginRight: '8px'}}/>
                                    <span>Logout</span>
                                </button>
                            </div>

                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="sidebar-content-area">
                    <div className="sidebar-content-card sidebar-fade-in">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;