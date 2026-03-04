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
      const stored = localStorage.getItem('company');
      return stored ? (JSON.parse(stored) as Company) : null;
    } catch {
      return null;
    }
  });

  // fetch company data if we don't already have it
  // read company id from environment variable – fallback to null if missing
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;

  const { data } = useQuery(GET_COMPANY_MAIN_DATA, {
    variables: { companyId: companyId },
    skip: !!company || !companyId,
  });

  // update company when query returns data
  useEffect(() => {
    if (data?.company) {
      console.log('Fetched company data:', data.company);
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

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error('useCompany must be used within a CompanyProvider');
  return context;
};

export default CompanyContext;
