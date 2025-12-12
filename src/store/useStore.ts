import { create } from 'zustand';
import { SportConfig, League, Team, Matchup } from '../types/models';

interface AppState {
    // Configs
    sportConfigs: Record<string, SportConfig>;
    activeSportConfigId: string | null;

    // Data
    leagues: Record<string, League>;
    activeLeagueId: string | null;

    matchups: Record<string, Matchup>;

    // Actions
    addSportConfig: (config: SportConfig) => void;
    setActiveSportConfig: (id: string) => void;
    addLeague: (league: League) => void;
    setActiveLeague: (id: string) => void;
    addTeamToLeague: (leagueId: string, team: Team) => void;
}

// Mock Initial Data
const initialSportConfig: SportConfig = {
    id: 'football-default',
    name: 'Fantasy Football',
    rosterSlots: [
        { id: 'qb', name: 'QB', count: 1, allowedPositions: ['QB'] },
        { id: 'rb', name: 'RB', count: 2, allowedPositions: ['RB'] },
        { id: 'wr', name: 'WR', count: 2, allowedPositions: ['WR'] },
    ],
    scoringRules: [
        { id: 'td', name: 'Touchdown', points: 6, statKey: 'touchdowns' },
    ],
    fieldLayout: {
        type: 'football',
        dimensions: { width: 50, length: 100 },
        zones: []
    }
};

export const useStore = create<AppState>((set) => ({
    sportConfigs: { [initialSportConfig.id]: initialSportConfig },
    activeSportConfigId: initialSportConfig.id,

    leagues: {},
    activeLeagueId: null,

    matchups: {},

    addSportConfig: (config) => set((state) => ({
        sportConfigs: { ...state.sportConfigs, [config.id]: config }
    })),

    setActiveSportConfig: (id) => set({ activeSportConfigId: id }),

    addLeague: (league) => set((state) => ({
        leagues: { ...state.leagues, [league.id]: league }
    })),

    setActiveLeague: (id) => set({ activeLeagueId: id }),

    addTeamToLeague: (leagueId, team) => set((state) => {
        const league = state.leagues[leagueId];
        if (!league) return state;

        return {
            leagues: {
                ...state.leagues,
                [leagueId]: {
                    ...league,
                    teams: [...league.teams, team]
                }
            }
        };
    }),
}));
