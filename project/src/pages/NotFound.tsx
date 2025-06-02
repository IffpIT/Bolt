import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page non trouvée</h2>
      <p className="text-neutral-600 mb-8 text-center max-w-md">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn-primary">
        <Home className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;