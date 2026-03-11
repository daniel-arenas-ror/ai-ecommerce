import MinimalCard from './styles/MinimalCard';
import PremiumCard from './styles/PremiumCard';
import CompactCard from './styles/CompactCard';
import DetailedCard from './styles/DetailedCard';
import ProfileCard from './styles/ProfileCard';
import MinimalProductCard from './styles/MinimalProductCard';
import type { CardStyle, CardComponent } from './types';

/**
 * Factory that returns the appropriate card component based on style
 * This makes it easy to add new styles and manage them centrally
 */
export const cardFactory = (style: CardStyle = 'minimal'): CardComponent => {
  const cardRegistry: Record<CardStyle, CardComponent> = {
    minimal: {
      component: MinimalCard,
      description: 'Clean and simple design',
    },
    premium: {
      component: PremiumCard,
      description: 'Rich design with more details',
    },
    compact: {
      component: CompactCard,
      description: 'Horizontal layout for mobile/narrow screens',
    },
    detailed: {
      component: DetailedCard,
      description: 'Full information display',
    },
    profile: {
      component: ProfileCard,
      description: 'Profile-style card with image focus',
    },
    minimal2: {
      component: MinimalProductCard,
      description: 'Minimal product photos',
    }
  };

  return cardRegistry[style] || cardRegistry.minimal;
};

/**
 * Get the style from backend configuration
 * This function should be called with company config data
 */
export const getCardStyleFromConfig = (
  companyConfig?: Record<string, unknown>
): CardStyle => {
  if (!companyConfig) return 'minimal';

  const cardStyle = companyConfig.cardStyle as string | undefined;
  
  if (cardStyle && ['minimal', 'premium', 'compact', 'detailed'].includes(cardStyle)) {
    return cardStyle as CardStyle;
  }

  return 'minimal';
};
