import { useContext } from 'react';
import { CompanyContext } from '../../context/CompanyContext';
import { getCardStyleFromConfig } from './cardFactory';
import type { CardStyle } from './types';

/**
 * Hook to get the card style from company context
 * Simplifies access to card configuration throughout the app
 */
export const useCardStyle = (): CardStyle => {
  const { company } = useContext(CompanyContext) || { company: null };
  
  // Assuming company object might have a config property in the future
  // For now, you can extend Company type to include cardStyle
  const config = (company as any)?.config;
  
  return getCardStyleFromConfig(config);
};
