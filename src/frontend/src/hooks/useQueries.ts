import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { VeduMessage } from "../backend";
import { useActor } from "./useActor";

// Vedu Chat Queries
export function useVeduData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["veduData"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVeduData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMessage(messageId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["veduMessage", messageId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMessage(messageId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMessages() {
  const { actor, isFetching } = useActor();

  return useQuery<VeduMessage[]>({
    queryKey: ["veduMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

// Vedu Chat Mutations
export function useVeduQueries() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const startBookingSession = useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.startBookingSession(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["veduData"] });
    },
  });

  const processBookingResponse = useMutation({
    mutationFn: async ({
      userId,
      response,
    }: { userId: string; response: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.processBookingResponse(userId, response);
    },
  });

  const submitBooking = useMutation({
    mutationFn: async (formData: string[]) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitBooking(formData);
    },
  });

  const initializeMessages = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeMessages();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["veduMessages"] });
      queryClient.invalidateQueries({ queryKey: ["veduData"] });
    },
  });

  return {
    startBookingSession,
    processBookingResponse,
    submitBooking,
    initializeMessages,
  };
}
