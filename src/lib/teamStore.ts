import { create } from "zustand";

interface TeamStore {
  selectedTeamId: string | null;
  setSelectedTeamId: (team: string) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  selectedTeamId: null,
  setSelectedTeamId: (team: string) => set({ selectedTeamId: team }),
}));

export default useTeamStore;
