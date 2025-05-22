import React from 'react';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`sidebar-footer ${className}`}>
            <div className="sidebar-footer-meta">
                <div>© {currentYear} Qossay Rida</div>
                <div className="sidebar-footer-version">v1.0.0</div>
            </div>
        </footer>
    );
};

export default Footer;
