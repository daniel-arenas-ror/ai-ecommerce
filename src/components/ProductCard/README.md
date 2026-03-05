# Product Card Factory Pattern - Architecture Guide

## Overview

This implementation uses the **Factory Pattern** combined with a centralized configuration system to manage multiple card styles. It provides:

- ✅ **Easy to extend** - Add new styles without modifying existing code
- ✅ **Backend-driven** - Card style determined by company configuration
- ✅ **Clean API** - Simple, intuitive component props
- ✅ **Separation of concerns** - Each style is its own component
- ✅ **Type-safe** - Full TypeScript support

## Architecture

```
ProductCard (Main Component - Factory Pattern)
├── styles/
│   ├── MinimalCard.tsx    (Clean, simple)
│   ├── PremiumCard.tsx    (Rich with details)
│   ├── CompactCard.tsx    (Horizontal layout)
│   └── DetailedCard.tsx   (Full information)
├── cardFactory.ts         (Factory - Returns correct component)
├── useCardStyle.ts        (Hook - Gets style from context)
├── types.ts               (Type definitions)
└── index.tsx              (Main export)
```

## How It Works

### 1. **Factory Function** (`cardFactory.ts`)

Returns the appropriate card component based on style:

```typescript
const { component: CardComponent } = cardFactory('premium');
// Returns PremiumCard component
```

### 2. **Configuration Provider** (`CompanyContext`)

Company data from backend includes card style preference:

```typescript
{
  id: 1,
  name: "My Store",
  iconUrl: "...",
  cardStyle: "premium"  // ← Configuration from backend
}
```

### 3. **Hook-based Access** (`useCardStyle.ts`)

Get the current style anywhere in your app:

```typescript
const cardStyle = useCardStyle(); // Returns 'premium'
```

## Usage Examples

### Option 1: Auto-detect from Company Context

```tsx
import ProductCard, { useCardStyle } from '@/components/ProductCard';

function MyComponent() {
  const products = [/* ... */];
  const cardStyle = useCardStyle();

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onViewDetail={handleViewDetail}
          // style is auto-detected!
        />
      ))}
    </div>
  );
}
```

### Option 2: Explicit Style Override

```tsx
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  onViewDetail={handleViewDetail}
  style="compact"  // Force a specific style
/>
```

### Option 3: Pass Config Directly

```tsx
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  onViewDetail={handleViewDetail}
  config={company}  // Use this config to determine style
/>
```

## Available Card Styles

### Minimal (Default)
- **Use case**: Catalogs with many products
- **Features**: Clean, simple, quick to scan
- **Layout**: Vertical, compact

### Premium
- **Use case**: High-end products, featured items
- **Features**: Favorite button, detailed amenities, gradient background
- **Layout**: Vertical, spacious

### Compact
- **Use case**: Mobile, sidebars, lists
- **Features**: Horizontal layout, minimal info
- **Layout**: Horizontal (image on left)

### Detailed
- **Use case**: Featured sections, detailed listings
- **Features**: Full information, ratings, multiple action buttons
- **Layout**: Vertical, comprehensive

## Adding a New Card Style

### Step 1: Create the component

Create `src/components/ProductCard/styles/MyNewCard.tsx`:

```tsx
import React from 'react';
import type { ProductCardProps } from '../types';

const MyNewCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetail 
}) => {
  return (
    <div className="...">
      {/* Your design here */}
    </div>
  );
};

export default MyNewCard;
```

### Step 2: Register in factory

Update `cardFactory.ts`:

```typescript
import MyNewCard from './styles/MyNewCard';

export const cardFactory = (style: CardStyle = 'minimal'): CardComponent => {
  const cardRegistry: Record<CardStyle, CardComponent> = {
    minimal: { component: MinimalCard, description: '...' },
    premium: { component: PremiumCard, description: '...' },
    compact: { component: CompactCard, description: '...' },
    detailed: { component: DetailedCard, description: '...' },
    mynew: { component: MyNewCard, description: 'My new style' },  // Add here
  };
  
  return cardRegistry[style] || cardRegistry.minimal;
};
```

### Step 3: Update types

Add to `types.ts`:

```typescript
export type CardStyle = 'minimal' | 'premium' | 'compact' | 'detailed' | 'mynew';
```

Done! The new style is now available everywhere.

## Backend Configuration

To use this pattern with your backend, extend the `Company` type:

```typescript
// types/company.ts
export interface Company {
  id: number;
  name: string;
  iconUrl: string;
  cardStyle?: 'minimal' | 'premium' | 'compact' | 'detailed';  // Add this
}
```

Then your backend can return the preferred card style in company responses:

```json
{
  "id": 1,
  "name": "My Store",
  "iconUrl": "...",
  "cardStyle": "premium"
}
```

## Benefits of This Architecture

| Benefit | Why It Matters |
|---------|---|
| **Single Responsibility** | Each component handles one style only |
| **DRY** | Shared logic in factory and hook, no duplication |
| **Scalable** | Add new styles without touching existing code |
| **Testable** | Each style component can be tested independently |
| **Backend-driven** | Style determined by server, not hardcoded |
| **Type-safe** | Full TypeScript support throughout |
| **Flexible** | Can override at component level if needed |

## Migration from Old ProductCard

If you have existing code using the old `ProductCard`:

```tsx
// Before
<ProductCard product={p} onAddToCart={fn} />

// After (no changes needed!)
<ProductCard product={p} onAddToCart={fn} />
// Now uses factory pattern automatically
```

The old API still works! Just update the import path if you restructured files.

## Tips & Best Practices

1. **Use the hook** - `useCardStyle()` is the preferred way to access the current style
2. **Keep styles self-contained** - Each style component should not depend on others
3. **Configuration over code** - Use backend config to drive style selection
4. **Consistent props** - All style components accept the same `ProductCardProps`
5. **Document styles** - Add descriptions to help developers choose the right style

## Troubleshooting

**Q: Card style not updating when company context changes?**  
A: Make sure you're using the `useCardStyle()` hook, which is reactive to context changes.

**Q: How do I use different styles in the same page?**  
A: Use the explicit `style` prop: `<ProductCard style="premium" ... />`

**Q: Can I mix styles?**  
A: Yes! Use different styles in different sections of your page for visual hierarchy.
