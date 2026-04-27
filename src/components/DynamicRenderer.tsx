import HeroBanner from './blocks/HeroBanner';
import ProductCarousel from './blocks/ProductCarousel';
import HtmlText from './blocks/HtmlText';

// Map database strings to React Components
const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  HeroBanner: HeroBanner,
  ProductCarousel: ProductCarousel,
  HtmlText: HtmlText,
};

const DynamicRenderer = ({ components }: { components: any[] }) => {
  // Ensure components are sorted by position
  const sortedComponents = [...components].sort((a, b) => a.position - b.position);

  return (
    <div className="flex flex-col">
      {sortedComponents.map((comp) => {
        const Component = BLOCK_COMPONENTS[comp.componentType];
        
        if (!Component) {
          console.warn(`Block type "${comp.componentType}" not found.`);
          return null;
        }

        return (
          <section key={comp.id} className="w-full">
            <Component {...comp.config} />
          </section>
        );
      })}
    </div>
  );
};

export default DynamicRenderer;
