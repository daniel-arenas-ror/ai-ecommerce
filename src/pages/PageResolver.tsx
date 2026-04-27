import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import DynamicRenderer from './DynamicRenderer';

const GET_PAGE_LAYOUT = gql`
  query GetPageLayout($path: String!, $version: String!) {
    pageLayout(path: $path, version: $version) {
      id
      title
      metaDescription
      pageComponents {
        id
        componentType
        config # This is your JSONB
        position
      }
    }
  }
`;

const PageResolver = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const version = searchParams.get('version') || 'published';

  const { data, loading, error } = useQuery(GET_PAGE_LAYOUT, {
    variables: { 
      path: location.pathname,
      version: version 
    },
  });

  if (loading) return <div className="p-20 text-center">Loading store...</div>;
  
  // If no dynamic page is found in Rails, show a 404
  if (!data?.pageLayout) return <NotFoundPage />;

  const { title, pageComponents } = data.pageLayout;

  return (
    <>
      {/* Update SEO metadata dynamically */}
      <head>
        <title>{title}</title>
      </head>
      
      {/* Pass the blocks to our actual renderer */}
      <DynamicRenderer components={pageComponents} />
    </>
  );
};

export default PageResolver;
