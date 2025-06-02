import React, { useState } from 'react';
import { Search, Plus, Edit } from 'lucide-react';
import { useExcelData } from '../contexts/ExcelDataContext';
import CompanyForm from '../components/CompanyForm';
import { motion, AnimatePresence } from 'framer-motion';

const Companies = () => {
  const { companies } = useExcelData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<string | null>(null);

  const filteredCompanies = companies.filter(company => {
    const searchString = searchTerm.toLowerCase();
    return (
      company.name?.toLowerCase().includes(searchString) ||
      company.sector?.toLowerCase().includes(searchString) ||
      company.city?.toLowerCase().includes(searchString) ||
      company.contactLastName?.toLowerCase().includes(searchString) ||
      company.contactFirstName?.toLowerCase().includes(searchString)
    );
  });

  const handleAddNew = () => {
    setCurrentCompany(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setCurrentCompany(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentCompany(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-neutral-900">Gestion des entreprises</h2>
        <button
          onClick={handleAddNew}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Nouvelle entreprise</span>
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="input pl-10"
          placeholder="Rechercher une entreprise..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Secteur</th>
              <th>Contact</th>
              <th>Localisation</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td>
                    <div className="font-medium">{company.name}</div>
                    <div className="text-xs text-neutral-500">SIRET: {company.siret}</div>
                  </td>
                  <td>{company.sector}</td>
                  <td>
                    <div>{company.contactFirstName} {company.contactLastName}</div>
                    <div className="text-xs text-neutral-500">{company.contactEmail}</div>
                  </td>
                  <td>
                    <div>{company.city}</div>
                    <div className="text-xs text-neutral-500">{company.postalCode}</div>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        company.relationshipStatus === 'Partenaire'
                          ? 'bg-success-50 text-success-700'
                          : company.relationshipStatus === 'Prospect'
                          ? 'bg-primary-50 text-primary-700'
                          : company.relationshipStatus === 'Inactif'
                          ? 'bg-neutral-100 text-neutral-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}
                    >
                      {company.relationshipStatus || 'Non défini'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="btn-outline p-2"
                      aria-label="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-neutral-500">
                  Aucune entreprise trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <CompanyForm
            companyId={currentCompany}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Companies;