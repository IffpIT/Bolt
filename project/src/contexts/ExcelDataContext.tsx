import React, { createContext, useContext, useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export interface Candidate {
  id: string;
  civility: string;
  origin: string;
  contactType: string;
  contactReferent: string;
  pedagogyReferent: string;
  formation: string;
  lastName: string;
  firstName: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  contactStatus: string;
  callStatus: string;
  refusalReason: string;
  learnerStatus: string;
  financing: string;
  appointmentStatus: string;
  appointmentDate: string;
  appointmentTime: string;
  statusComment: string;
  appointmentComment: string;
  [key: string]: string | number | Date;
}

export interface Company {
  id: string;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  sector: string;
  contactCivility: string;
  contactLastName: string;
  contactFirstName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  referent: string;
  apprenticeCount: number;
  relationshipStatus: string;
  comments: string;
  [key: string]: string | number | Date;
}

interface ExcelDataContextType {
  candidates: Candidate[];
  companies: Company[];
  loadExcelFile: (file: File) => void;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, candidate: Partial<Candidate>) => void;
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  exportToExcel: () => void;
  isLoading: boolean;
  hasLoadedFile: boolean;
}

const ExcelDataContext = createContext<ExcelDataContextType | undefined>(undefined);

export const useExcelData = () => {
  const context = useContext(ExcelDataContext);
  if (context === undefined) {
    throw new Error('useExcelData must be used within an ExcelDataProvider');
  }
  return context;
};

export const ExcelDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedFile, setHasLoadedFile] = useState(false);

  // Load sample data if no file is loaded
  useEffect(() => {
    if (!hasLoadedFile) {
      // Sample candidates
      setCandidates([
        {
          id: '1',
          civility: 'M.',
          origin: 'Site Web',
          contactType: 'Direct',
          contactReferent: 'Jean Dupont',
          pedagogyReferent: 'Marie Martin',
          formation: 'Développement Web',
          lastName: 'Dubois',
          firstName: 'Pierre',
          mobilePhone: '06 12 34 56 78',
          landlinePhone: '01 23 45 67 89',
          email: 'pierre.dubois@example.com',
          contactStatus: 'Contacté',
          callStatus: 'Intéressé',
          refusalReason: '',
          learnerStatus: 'Prospect',
          financing: 'CPF',
          appointmentStatus: 'Planifié',
          appointmentDate: '2025-06-15',
          appointmentTime: '14:30',
          statusComment: 'Très motivé',
          appointmentComment: 'Premier rendez-vous d\'information',
        },
        {
          id: '2',
          civility: 'Mme',
          origin: 'Partenaire',
          contactType: 'Recommandation',
          contactReferent: 'Sophie Leroy',
          pedagogyReferent: 'Pierre Martin',
          formation: 'Marketing Digital',
          lastName: 'Martin',
          firstName: 'Julie',
          mobilePhone: '06 98 76 54 32',
          landlinePhone: '',
          email: 'julie.martin@example.com',
          contactStatus: 'Inscrit',
          callStatus: 'Confirmé',
          refusalReason: '',
          learnerStatus: 'Étudiant',
          financing: 'Entreprise',
          appointmentStatus: 'Réalisé',
          appointmentDate: '2025-05-20',
          appointmentTime: '10:00',
          statusComment: 'Dossier complet',
          appointmentComment: 'Rendez-vous très positif',
        },
      ]);

      // Sample companies
      setCompanies([
        {
          id: '1',
          name: 'TechInnovate',
          siret: '12345678901234',
          address: '15 rue de l\'Innovation',
          postalCode: '75001',
          city: 'Paris',
          phone: '01 23 45 67 89',
          email: 'contact@techinnovate.fr',
          website: 'www.techinnovate.fr',
          sector: 'Technologie',
          contactCivility: 'M.',
          contactLastName: 'Leclerc',
          contactFirstName: 'Thomas',
          contactRole: 'Directeur RH',
          contactPhone: '06 12 34 56 78',
          contactEmail: 'thomas.leclerc@techinnovate.fr',
          referent: 'Marie Dubois',
          apprenticeCount: 3,
          relationshipStatus: 'Partenaire',
          comments: 'Entreprise très active dans notre réseau',
        },
        {
          id: '2',
          name: 'MarketingPlus',
          siret: '98765432109876',
          address: '8 avenue du Commerce',
          postalCode: '69002',
          city: 'Lyon',
          phone: '04 78 12 34 56',
          email: 'info@marketingplus.fr',
          website: 'www.marketingplus.fr',
          sector: 'Marketing',
          contactCivility: 'Mme',
          contactLastName: 'Bernard',
          contactFirstName: 'Laure',
          contactRole: 'Responsable Recrutement',
          contactPhone: '06 98 76 54 32',
          contactEmail: 'l.bernard@marketingplus.fr',
          referent: 'Jean Martin',
          apprenticeCount: 2,
          relationshipStatus: 'Prospect',
          comments: 'Intéressé par nos formations en marketing digital',
        },
      ]);
    }
  }, [hasLoadedFile]);

  const loadExcelFile = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      setWorkbook(wb);

      // Process candidates sheet
      if (wb.SheetNames.includes('Candidats')) {
        const candidatesSheet = wb.Sheets['Candidats'];
        const candidatesData = XLSX.utils.sheet_to_json<any>(candidatesSheet);
        
        const processedCandidates = candidatesData.map((row, index) => ({
          id: row.id || `c${index + 1}`,
          civility: row.Civilité || '',
          origin: row.Origine || '',
          contactType: row['Type contact'] || '',
          contactReferent: row['Référent Contact'] || '',
          pedagogyReferent: row['Référent Pédagogie'] || '',
          formation: row.Formation || '',
          lastName: row.Nom || '',
          firstName: row.Prénom || '',
          mobilePhone: row['Téléphone mobile'] || '',
          landlinePhone: row['Téléphone fixe'] || '',
          email: row.Email || '',
          contactStatus: row['Statut contact'] || '',
          callStatus: row['Statut Appels'] || '',
          refusalReason: row['Motif Refus'] || '',
          learnerStatus: row['Statut Apprenant'] || '',
          financing: row.Financement || '',
          appointmentStatus: row['État RDV'] || '',
          appointmentDate: row['Date RDV'] || '',
          appointmentTime: row['Heure RDV'] || '',
          statusComment: row['Remarque Statut'] || '',
          appointmentComment: row['Remarque RDV'] || '',
        }));
        
        setCandidates(processedCandidates);
      }

      // Process companies sheet
      if (wb.SheetNames.includes('Entreprises')) {
        const companiesSheet = wb.Sheets['Entreprises'];
        const companiesData = XLSX.utils.sheet_to_json<any>(companiesSheet);
        
        const processedCompanies = companiesData.map((row, index) => ({
          id: row.id || `e${index + 1}`,
          name: row['Nom Entreprise'] || '',
          siret: row.SIRET || '',
          address: row.Adresse || '',
          postalCode: row['Code postal'] || '',
          city: row.Ville || '',
          phone: row.Téléphone || '',
          email: row.Email || '',
          website: row['Site web'] || '',
          sector: row['Secteur d\'activité'] || '',
          contactCivility: row.Civilité || '',
          contactLastName: row.Nom || '',
          contactFirstName: row.Prénom || '',
          contactRole: row['Fonction contact'] || '',
          contactPhone: row['Téléphone contact'] || '',
          contactEmail: row['Email contact'] || '',
          referent: row['Référent IFFP'] || '',
          apprenticeCount: row['Nombre apprentis'] || 0,
          relationshipStatus: row['Statut relation'] || '',
          comments: row.Remarques || '',
        }));
        
        setCompanies(processedCompanies);
      }
      
      setHasLoadedFile(true);
    } catch (error) {
      console.error('Error loading Excel file:', error);
      alert('Erreur lors du chargement du fichier Excel. Veuillez vérifier le format du fichier.');
    } finally {
      setIsLoading(false);
    }
  };

  const addCandidate = (candidate: Omit<Candidate, 'id'>) => {
    const newCandidate = {
      ...candidate,
      id: `c${Date.now()}`,
    };
    setCandidates([...candidates, newCandidate]);
  };

  const updateCandidate = (id: string, updatedData: Partial<Candidate>) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, ...updatedData } : candidate
      )
    );
  };

  const addCompany = (company: Omit<Company, 'id'>) => {
    const newCompany = {
      ...company,
      id: `e${Date.now()}`,
    };
    setCompanies([...companies, newCompany]);
  };

  const updateCompany = (id: string, updatedData: Partial<Company>) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, ...updatedData } : company
      )
    );
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Convert candidates to worksheet
    const candidatesData = candidates.map(candidate => ({
      'Civilité': candidate.civility,
      'Origine': candidate.origin,
      'Type contact': candidate.contactType,
      'Référent Contact': candidate.contactReferent,
      'Référent Pédagogie': candidate.pedagogyReferent,
      'Formation': candidate.formation,
      'Nom': candidate.lastName,
      'Prénom': candidate.firstName,
      'Téléphone mobile': candidate.mobilePhone,
      'Téléphone fixe': candidate.landlinePhone,
      'Email': candidate.email,
      'Statut contact': candidate.contactStatus,
      'Statut Appels': candidate.callStatus,
      'Motif Refus': candidate.refusalReason,
      'Statut Apprenant': candidate.learnerStatus,
      'Financement': candidate.financing,
      'État RDV': candidate.appointmentStatus,
      'Date RDV': candidate.appointmentDate,
      'Heure RDV': candidate.appointmentTime,
      'Remarque Statut': candidate.statusComment,
      'Remarque RDV': candidate.appointmentComment,
    }));
    
    const candidatesWs = XLSX.utils.json_to_sheet(candidatesData);
    XLSX.utils.book_append_sheet(wb, candidatesWs, 'Candidats');
    
    // Convert companies to worksheet
    const companiesData = companies.map(company => ({
      'Nom Entreprise': company.name,
      'SIRET': company.siret,
      'Adresse': company.address,
      'Code postal': company.postalCode,
      'Ville': company.city,
      'Téléphone': company.phone,
      'Email': company.email,
      'Site web': company.website,
      'Secteur d\'activité': company.sector,
      'Civilité': company.contactCivility,
      'Nom': company.contactLastName,
      'Prénom': company.contactFirstName,
      'Fonction contact': company.contactRole,
      'Téléphone contact': company.contactPhone,
      'Email contact': company.contactEmail,
      'Référent IFFP': company.referent,
      'Nombre apprentis': company.apprenticeCount,
      'Statut relation': company.relationshipStatus,
      'Remarques': company.comments,
    }));
    
    const companiesWs = XLSX.utils.json_to_sheet(companiesData);
    XLSX.utils.book_append_sheet(wb, companiesWs, 'Entreprises');
    
    // Create dashboard sheet
    const dashboardData = [
      ['Statistiques CRM', ''],
      ['', ''],
      ['Nombre total de candidats', candidates.length],
      ['Nombre total d\'entreprises', companies.length],
      ['', ''],
      ['Statuts des candidats', ''],
      ...Array.from(new Set(candidates.map(c => c.contactStatus)))
        .map(status => [
          status,
          candidates.filter(c => c.contactStatus === status).length
        ]),
      ['', ''],
      ['Secteurs d\'entreprises', ''],
      ...Array.from(new Set(companies.map(c => c.sector)))
        .map(sector => [
          sector,
          companies.filter(c => c.sector === sector).length
        ]),
    ];
    
    const dashboardWs = XLSX.utils.aoa_to_sheet(dashboardData);
    XLSX.utils.book_append_sheet(wb, dashboardWs, 'Accueil');
    
    // Generate Excel file
    XLSX.writeFile(wb, 'CRM_Export.xlsx');
  };

  return (
    <ExcelDataContext.Provider
      value={{
        candidates,
        companies,
        loadExcelFile,
        addCandidate,
        updateCandidate,
        addCompany,
        updateCompany,
        exportToExcel,
        isLoading,
        hasLoadedFile,
      }}
    >
      {children}
    </ExcelDataContext.Provider>
  );
};