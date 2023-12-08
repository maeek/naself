import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const asyncService = createApi({
  reducerPath: 'asyncService',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({})
});
