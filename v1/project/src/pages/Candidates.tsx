import React, { useState } from 'react';
import { Search, Plus, Edit } from 'lucide-react';
import { useExcelData } from '../contexts/ExcelDataContext';
import CandidateForm from '../components/CandidateForm';
import { motion, AnimatePresence } from 'framer-motion';

const Candidates = () => {
  const { candidates } = useExcelData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<string | null>(null);

  const filteredCandidates = candidates.filter(candidate => {
    const searchString = searchTerm.toLowerCase();
    return (
      candidate.lastName?.toLowerCase().includes(searchString) ||
      candidate.firstName?.toLowerCase().includes(searchString) ||
      candidate.email?.toLowerCase().includes(searchString) ||
      candidate.formation?.toLowerCase().includes(searchString) ||
      candidate.contactStatus?.toLowerCase().includes(searchString)
    );
  });

  const handleAddNew = () => {
    setCurrentCandidate(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setCurrentCandidate(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentCandidate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-neutral-900">Gestion des candidats</h2>
        <button
          onClick={handleAddNew}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Nouveau candidat</span>
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="input pl-10"
          placeholder="Rechercher un candidat..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Formation</th>
              <th>Contact</th>
              <th>Statut</th>
              <th>RDV</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <motion.tr
                  key={candidate.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td>
                    <div className="font-medium">{candidate.lastName} {candidate.firstName}</div>
                    <div className="text-xs text-neutral-500">{candidate.civility}</div>
                  </td>
                  <td>{candidate.formation}</td>
                  <td>
                    <div>{candidate.email}</div>
                    <div className="text-xs text-neutral-500">{candidate.mobilePhone}</div>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        candidate.contactStatus === 'Inscrit'
                          ? 'bg-success-50 text-success-700'
                          : candidate.contactStatus === 'Contacté'
                          ? 'bg-primary-50 text-primary-700'
                          : candidate.contactStatus === 'Refusé'
                          ? 'bg-error-50 text-error-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {candidate.contactStatus || 'Non défini'}
                    </span>
                  </td>
                  <td>
                    {candidate.appointmentDate ? (
                      <div>
                        <div>{new Date(candidate.appointmentDate).toLocaleDateString('fr-FR')}</div>
                        <div className="text-xs text-neutral-500">{candidate.appointmentTime}</div>
                      </div>
                    ) : (
                      <span className="text-neutral-400">Non planifié</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(candidate.id)}
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
                  Aucun candidat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <CandidateForm
            candidateId={currentCandidate}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Candidates;