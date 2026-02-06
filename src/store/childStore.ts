import { create } from "zustand";

// Child data model
export interface Child {
  id: string;
  name: string;
  amount: number;
  rate: number; // annual %
  startDate: string;
  currency: string;
  age?: number;
}

interface ChildState {
  children: Child[];
  addChild: (child: Omit<Child, "id">) => void; // id generated automatically
  updateChild: (child: Child) => void;
  removeChild: (id: string) => void;
}

const STORAGE_KEY = "children";

// Load existing children from localStorage
function loadChildren(): Child[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Generate unique ID
function generateId(): string {
  return (
    crypto?.randomUUID?.() || Date.now().toString() + Math.random().toString(16)
  );
}

export const useChildStore = create<ChildState>((set, get) => ({
  children: loadChildren(),

  // Add new child safely
  addChild: (child) => {
    const newChild: Child = { id: generateId(), ...child };
    const updated = [...get().children, newChild];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ children: updated });
  },

  // Update only the matching child
  updateChild: (child) => {
    const updated = get().children.map((c) =>
      c.id === child.id ? { ...c, ...child } : c,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ children: updated });
  },

  // Remove by ID
  removeChild: (id) => {
    const updated = get().children.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ children: updated });
  },
}));
