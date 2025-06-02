import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExcelData, Candidate } from '../contexts/ExcelDataContext';

interface CandidateFormProps {
  candidateId: string | null;
  onClose: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ candidateId, onClose }) => {
  const { candidates, addCandidate, updateCandidate } = useExcelData();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Candidate, 'id'>>();
  
  const isEditing = Boolean(candidateId);
  
  useEffect(() => {
    if (candidateId) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate) {
        reset(candidate);
      }
    }
  }, [candidateId, candidates, reset]);
  
  const onSubmit = (data: Omit<Candidate, 'id'>) => {
    if (candidateId) {
      updateCandidate(candidateId, data);
    } else {
      addCandidate(data);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-neutral-900">
            {isEditing ? 'Modifier un candidat' : 'Ajouter un candidat'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label htmlFor="civility" className="form-label">Civilité</label>
              <select 
                id="civility" 
                className="input" 
                {...register('civility')}
              >
                <option value="">Sélectionner</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Nom</label>
              <input 
                id="lastName" 
                type="text" 
                className="input" 
                {...register('lastName', { required: "Le nom est requis" })}
              />
              {errors.lastName && <p className="text-xs text-error-500 mt-1">{errors.lastName.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">Prénom</label>
              <input 
                id="firstName" 
                type="text" 
                className="input" 
                {...register('firstName', { required: "Le prénom est requis" })}
              />
              {errors.firstName && <p className="text-xs text-error-500 mt-1">{errors.firstName.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="mobilePhone" className="form-label">Téléphone mobile</label>
              <input 
                id="mobilePhone" 
                type="text" 
                className="input" 
                {...register('mobilePhone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="landlinePhone" className="form-label">Téléphone fixe</label>
              <input 
                id="landlinePhone" 
                type="text" 
                className="input" 
                {...register('landlinePhone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                id="email" 
                type="email" 
                className="input" 
                {...register('email', { 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide"
                  }
                })}
              />
              {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="origin" className="form-label">Origine</label>
              <input 
                id="origin" 
                type="text" 
                className="input" 
                {...register('origin')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactType" className="form-label">Type contact</label>
              <input 
                id="contactType" 
                type="text" 
                className="input" 
                {...register('contactType')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="formation" className="form-label">Formation</label>
              <input 
                id="formation" 
                type="text" 
                className="input" 
                {...register('formation')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactReferent" className="form-label">Référent Contact</label>
              <input 
                id="contactReferent" 
                type="text" 
                className="input" 
                {...register('contactReferent')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pedagogyReferent" className="form-label">Référent Pédagogie</label>
              <input 
                id="pedagogyReferent" 
                type="text" 
                className="input" 
                {...register('pedagogyReferent')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactStatus" className="form-label">Statut contact</label>
              <select 
                id="contactStatus" 
                className="input" 
                {...register('contactStatus')}
              >
                <option value="">Sélectionner</option>
                <option value="Prospect">Prospect</option>
                <option value="Contacté">Contacté</option>
                <option value="Intéressé">Intéressé</option>
                <option value="Inscrit">Inscrit</option>
                <option value="Refusé">Refusé</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="callStatus" className="form-label">Statut Appels</label>
              <select 
                id="callStatus" 
                className="input" 
                {...register('callStatus')}
              >
                <option value="">Sélectionner</option>
                <option value="Non contacté">Non contacté</option>
                <option value="Message laissé">Message laissé</option>
                <option value="Intéressé">Intéressé</option>
                <option value="Pas intéressé">Pas intéressé</option>
                <option value="Confirmé">Confirmé</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="refusalReason" className="form-label">Motif Refus</label>
              <input 
                id="refusalReason" 
                type="text" 
                className="input" 
                {...register('refusalReason')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="learnerStatus" className="form-label">Statut Apprenant</label>
              <select 
                id="learnerStatus" 
                className="input" 
                {...register('learnerStatus')}
              >
                <option value="">Sélectionner</option>
                <option value="Prospect">Prospect</option>
                <option value="Candidat">Candidat</option>
                <option value="Étudiant">Étudiant</option>
                <option value="Ancien">Ancien</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="financing" className="form-label">Financement</label>
              <input 
                id="financing" 
                type="text" 
                className="input" 
                {...register('financing')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentStatus" className="form-label">État RDV</label>
              <select 
                id="appointmentStatus" 
                className="input" 
                {...register('appointmentStatus')}
              >
                <option value="">Sélectionner</option>
                <option value="Non planifié">Non planifié</option>
                <option value="Planifié">Planifié</option>
                <option value="Réalisé">Réalisé</option>
                <option value="Annulé">Annulé</option>
                <option value="Reporté">Reporté</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentDate" className="form-label">Date RDV</label>
              <input 
                id="appointmentDate" 
                type="date" 
                className="input" 
                {...register('appointmentDate')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentTime" className="form-label">Heure RDV</label>
              <input 
                id="appointmentTime" 
                type="time" 
                className="input" 
                {...register('appointmentTime')}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label htmlFor="statusComment" className="form-label">Remarque Statut</label>
              <textarea 
                id="statusComment" 
                className="input min-h-[80px]" 
                {...register('statusComment')}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentComment" className="form-label">Remarque RDV</label>
              <textarea 
                id="appointmentComment" 
                className="input min-h-[80px]" 
                {...register('appointmentComment')}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary"
            >
              {isEditing ? 'Enregistrer les modifications' : 'Ajouter le candidat'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CandidateForm;