import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth() {
  return {
    user: {
      id: 1,
      name: "Administrador",
      email: "admin@orbita.local",
    },
    loading: false,
    error: null,
    isAuthenticated: true,
    refresh: async () => {},
    logout: async () => {},
  };
}