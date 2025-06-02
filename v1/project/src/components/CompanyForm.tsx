import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExcelData, Company } from '../contexts/ExcelDataContext';

interface CompanyFormProps {
  companyId: string | null;
  onClose: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ companyId, onClose }) => {
  const { companies, addCompany, updateCompany } = useExcelData();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Company, 'id'>>();
  
  const isEditing = Boolean(companyId);
  
  useEffect(() => {
    if (companyId) {
      const company = companies.find(c => c.id === companyId);
      if (company) {
        reset(company);
      }
    }
  }, [companyId, companies, reset]);
  
  const onSubmit = (data: Omit<Company, 'id'>) => {
    if (companyId) {
      updateCompany(companyId, data);
    } else {
      addCompany(data);
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
            {isEditing ? 'Modifier une entreprise' : 'Ajouter une entreprise'}
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
          <h4 className="text-lg font-medium mb-4">Informations de l'entreprise</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nom Entreprise</label>
              <input 
                id="name" 
                type="text" 
                className="input" 
                {...register('name', { required: "Le nom de l'entreprise est requis" })}
              />
              {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="siret" className="form-label">SIRET</label>
              <input 
                id="siret" 
                type="text" 
                className="input" 
                {...register('siret')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sector" className="form-label">Secteur d'activité</label>
              <input 
                id="sector" 
                type="text" 
                className="input" 
                {...register('sector')}
              />
            </div>
            
            <div className="form-group lg:col-span-3">
              <label htmlFor="address" className="form-label">Adresse</label>
              <input 
                id="address" 
                type="text" 
                className="input" 
                {...register('address')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="postalCode" className="form-label">Code postal</label>
              <input 
                id="postalCode" 
                type="text" 
                className="input" 
                {...register('postalCode')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="city" className="form-label">Ville</label>
              <input 
                id="city" 
                type="text" 
                className="input" 
                {...register('city')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Téléphone</label>
              <input 
                id="phone" 
                type="text" 
                className="input" 
                {...register('phone')}
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
              <label htmlFor="website" className="form-label">Site web</label>
              <input 
                id="website" 
                type="text" 
                className="input" 
                {...register('website')}
              />
            </div>
          </div>
          
          <h4 className="text-lg font-medium mb-4 mt-8">Informations de contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label htmlFor="contactCivility" className="form-label">Civilité</label>
              <select 
                id="contactCivility" 
                className="input" 
                {...register('contactCivility')}
              >
                <option value="">Sélectionner</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="contactLastName" className="form-label">Nom</label>
              <input 
                id="contactLastName" 
                type="text" 
                className="input" 
                {...register('contactLastName')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactFirstName" className="form-label">Prénom</label>
              <input 
                id="contactFirstName" 
                type="text" 
                className="input" 
                {...register('contactFirstName')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactRole" className="form-label">Fonction contact</label>
              <input 
                id="contactRole" 
                type="text" 
                className="input" 
                {...register('contactRole')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactPhone" className="form-label">Téléphone contact</label>
              <input 
                id="contactPhone" 
                type="text" 
                className="input" 
                {...register('contactPhone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail" className="form-label">Email contact</label>
              <input 
                id="contactEmail" 
                type="email" 
                className="input" 
                {...register('contactEmail', { 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide"
                  }
                })}
              />
              {errors.contactEmail && <p className="text-xs text-error-500 mt-1">{errors.contactEmail.message}</p>}
            </div>
          </div>
          
          <h4 className="text-lg font-medium mb-4 mt-8">Suivi relation</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label htmlFor="referent" className="form-label">Référent IFFP</label>
              <input 
                id="referent" 
                type="text" 
                className="input" 
                {...register('referent')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="apprenticeCount" className="form-label">Nombre apprentis</label>
              <input 
                id="apprenticeCount" 
                type="number" 
                className="input" 
                min="0"
                {...register('apprenticeCount', { 
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Le nombre doit être positif"
                  }
                })}
              />
              {errors.apprenticeCount && <p className="text-xs text-error-500 mt-1">{errors.apprenticeCount.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="relationshipStatus" className="form-label">Statut relation</label>
              <select 
                id="relationshipStatus" 
                className="input" 
                {...register('relationshipStatus')}
              >
                <option value="">Sélectionner</option>
                <option value="Prospect">Prospect</option>
                <option value="Contact initial">Contact initial</option>
                <option value="Négociation">Négociation</option>
                <option value="Partenaire">Partenaire</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
            
            <div className="form-group md:col-span-3">
              <label htmlFor="comments" className="form-label">Remarques</label>
              <textarea 
                id="comments" 
                className="input min-h-[100px]" 
                {...register('comments')}
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
              {isEditing ? 'Enregistrer les modifications' : 'Ajouter l\'entreprise'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CompanyForm;