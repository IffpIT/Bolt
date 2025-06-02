import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Building2, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Accueil' },
    { path: '/candidates', icon: <Users size={20} />, label: 'Candidats' },
    { path: '/companies', icon: <Building2 size={20} />, label: 'Entreprises' },
  ];

  return (
    <motion.aside
      className={`bg-primary-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden md:flex`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-primary-700">
        <div className="flex items-center space-x-3">
          {!isCollapsed && (
            <motion.span
              className="text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              CRM Excel
            </motion.span>
          )}
          <Database size={24} />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-primary-200 hover:text-white p-1 rounded"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 ${
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700/50'
                  } rounded-md mx-2 transition-colors`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <motion.span
                    className="ml-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary-700 text-xs text-primary-300">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            CRM avec Excel © 2025
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;