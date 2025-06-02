import React from 'react';
import { useExcelData } from '../contexts/ExcelDataContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileSpreadsheet, Users, Building2, Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = () => {
  const { candidates, companies, exportToExcel } = useExcelData();

  // Calculate statistics
  const candidateStatuses = candidates.reduce<Record<string, number>>((acc, candidate) => {
    const status = candidate.contactStatus || 'Non défini';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const candidateStatusData = Object.entries(candidateStatuses).map(([name, value]) => ({
    name,
    value,
  }));

  const companySectors = companies.reduce<Record<string, number>>((acc, company) => {
    const sector = company.sector || 'Non défini';
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});

  const companySectorData = Object.entries(companySectors).map(([name, value]) => ({
    name,
    value,
  }));

  const appointmentData = [
    { name: 'Planifié', count: candidates.filter(c => c.appointmentStatus === 'Planifié').length },
    { name: 'Réalisé', count: candidates.filter(c => c.appointmentStatus === 'Réalisé').length },
    { name: 'Annulé', count: candidates.filter(c => c.appointmentStatus === 'Annulé').length },
    { name: 'Reporté', count: candidates.filter(c => c.appointmentStatus === 'Reporté').length },
  ].filter(item => item.count > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-900">Tableau de bord</h2>
        <button 
          onClick={exportToExcel}
          className="btn-primary flex items-center space-x-2"
        >
          <FileSpreadsheet size={18} />
          <span>Exporter vers Excel</span>
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Candidats</p>
              <h3 className="text-3xl font-bold text-neutral-900">{candidates.length}</h3>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Entreprises</p>
              <h3 className="text-3xl font-bold text-neutral-900">{companies.length}</h3>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <Building2 className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Formations</p>
              <h3 className="text-3xl font-bold text-neutral-900">
                {new Set(candidates.map(c => c.formation).filter(Boolean)).size}
              </h3>
            </div>
            <div className="p-3 bg-success-50 rounded-full">
              <Briefcase className="h-6 w-6 text-success-700" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">RDV planifiés</p>
              <h3 className="text-3xl font-bold text-neutral-900">
                {candidates.filter(c => c.appointmentStatus === 'Planifié').length}
              </h3>
            </div>
            <div className="p-3 bg-warning-50 rounded-full">
              <Calendar className="h-6 w-6 text-warning-700" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants}
          className="card p-4 lg:p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Statuts des candidats</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidateStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {candidateStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="card p-4 lg:p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Secteurs d'activité</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companySectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {companySectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="card p-4 lg:p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">État des rendez-vous</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Nombre de RDV" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;