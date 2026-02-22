import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// This file is reserved for React Query hooks that interact with the backend
// Currently, the booking form submits directly to Google Sheets via Google Apps Script
// so no backend queries are needed for the booking functionality

// Example query hook structure (for future use):
// export function useExampleQuery() {
//   const { actor, isFetching } = useActor();
//
//   return useQuery({
//     queryKey: ['example'],
//     queryFn: async () => {
//       if (!actor) return null;
//       return actor.someMethod();
//     },
//     enabled: !!actor && !isFetching,
//   });
// }
