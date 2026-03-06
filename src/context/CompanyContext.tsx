import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from "@apollo/client/react";
import type { Company } from '../types/company';
import { GET_COMPANY_MAIN_DATA } from '../api/queries/company';

interface CompanyContextType {
  company: Company | null;
  setCompany: (company: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // initialize state from localStorage (synchronous) to avoid unnecessary fetch
  const [company, setCompany] = useState<Company | null>(() => {
    try {
      //const stored = localStorage.getItem('company');
      //return stored ? (JSON.parse(stored) as Company) : null;
        return null; // --- IGNORE localStorage for now to simplify development ---
    } catch {
      return null;
    }
  });

  // fetch company data if we don't already have it
  // read company id from environment variable – fallback to null if missing
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;

  const { data, loading } = useQuery<{ company: Company }>(GET_COMPANY_MAIN_DATA, {
    variables: { companyId: companyId },
    skip: !!company || !companyId,
  });

  // update company when query returns data
  useEffect(() => {
    if (data?.company) {
      setCompany(data.company);
      try {
        localStorage.setItem('company', JSON.stringify(data.company));
      } catch (e) {
        // ignore localStorage errors
      }
    }
  }, [data?.company?.id]); // only depends on company id to avoid unnecessary updates

  const value: CompanyContextType = {
    company,
    setCompany
  };

  // show spinner while loading and company is not yet available
  if (loading && !company) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading company information...</p>
        </div>
      </div>
    );
  }

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error('useCompany must be used within a CompanyProvider');
  return context;
};

export default CompanyContext;
