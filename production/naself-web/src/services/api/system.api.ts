import { asyncService } from '../async.service';

export const systemApi = asyncService.injectEndpoints({
  endpoints: builder => ({
    getStatus: builder.query<{ status: string }, void>({
      query: () => '/api/system/status'
    })
  })
});

export const { useGetStatusQuery } = systemApi;
