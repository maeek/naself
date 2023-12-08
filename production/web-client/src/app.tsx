import { useGetStatusQuery } from '@/services/api/system.api';
import './app.scss';

export const App = () => {
  const { currentData } = useGetStatusQuery();

  return <div>{JSON.stringify(currentData)}</div>;
};
