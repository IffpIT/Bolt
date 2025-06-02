import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { useExcelData } from '../contexts/ExcelDataContext';

const Header = () => {
  const location = useLocation();
  const { loadExcelFile } = useExcelData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tableau de bord';
      case '/candidates':
        return 'Gestion des candidats';
      case '/companies':
        return 'Gestion des entreprises';
      default:
        return 'CRM Excel';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadExcelFile(file);
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 text-xl font-semibold text-neutral-900">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                className="input pl-10 w-64"
                placeholder="Rechercher..."
              />
            </div>

            <label className="btn-primary cursor-pointer">
              <span>Charger Excel</span>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;