import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import './Layout.css';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout">
      <nav className="layout-nav">
        <div className="layout-nav-content">
          <h1 className="layout-title">👥 User Directory</h1>
          <div className="layout-nav-links">
            <Link to="/" className="layout-nav-link">
              List Users
            </Link>
            <Link to="/add" className="layout-nav-link">
              Add User
            </Link>
          </div>
        </div>
      </nav>
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;