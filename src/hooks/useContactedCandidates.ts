import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "contactedCandidates";

// Función para obtener candidatos contactados del localStorage
function getContactedFromStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      return new Set(parsed);
    }
  } catch (error) {
    console.error(
      "Error reading contacted candidates from localStorage:",
      error,
    );
  }
  return new Set();
}

// Función para guardar en localStorage
function saveContactedToStorage(contacted: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(contacted)));
  } catch (error) {
    console.error("Error saving contacted candidates to localStorage:", error);
  }
}

// Store global para sincronización entre tabs/componentes
let contactedCandidates = getContactedFromStorage();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return contactedCandidates;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

/**
 * Hook para manejar candidatos contactados con localStorage.
 * Sincroniza automáticamente entre componentes y tabs del navegador.
 *
 * @example
 * ```tsx
 * const { isContacted, markAsContacted, contactedCandidates } = useContactedCandidates();
 *
 * if (isContacted('usuario123')) {
 *   console.log('Ya contactado');
 * }
 *
 * markAsContacted('usuario123');
 * ```
 */
export function useContactedCandidates() {
  // Usar useSyncExternalStore para sincronización reactiva
  const contacted = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const isContacted = useCallback(
    (username: string): boolean => {
      return contacted.has(username);
    },
    [contacted],
  );

  const markAsContacted = useCallback((username: string): void => {
    contactedCandidates = new Set(contactedCandidates);
    contactedCandidates.add(username);
    saveContactedToStorage(contactedCandidates);
    emitChange();
  }, []);

  const getContactedCandidates = useCallback((): Set<string> => {
    return new Set(contacted);
  }, [contacted]);

  const clearContacted = useCallback((): void => {
    contactedCandidates = new Set();
    saveContactedToStorage(contactedCandidates);
    emitChange();
  }, []);

  return useMemo(
    () => ({
      isContacted,
      markAsContacted,
      contactedCandidates: contacted,
      getContactedCandidates,
      clearContacted,
    }),
    [
      isContacted,
      markAsContacted,
      contacted,
      getContactedCandidates,
      clearContacted,
    ],
  );
}
