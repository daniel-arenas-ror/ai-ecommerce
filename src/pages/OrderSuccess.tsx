import { useParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>Order pagada {id}</>
  )
}

export default OrderSuccess;
