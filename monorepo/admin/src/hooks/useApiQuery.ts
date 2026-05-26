import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/config/api';
import type { AxiosError } from 'axios';

export function useApiQuery<T = unknown>(
  key: string | string[],
  url: string,
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>,
) {
  const queryKey = Array.isArray(key) ? key : [key];

  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
    ...options,
  });
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>,
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await api[method]<TData>(url, variables);
      return data;
    },
    ...options,
  });
}
