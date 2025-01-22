import { useQuery } from '@tanstack/react-query';
import { fetchDataAsync } from '../utils/fetchDataAsync';

const useTanStack = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchDataAsync,
  });
  return { data, isLoading, isError, refetch };
};

export default useTanStack;
