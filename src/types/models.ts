export interface SportConfig {
    id: string;
    name: string;
    rosterSlots: RosterSlotConfig[];
    scoringRules: ScoringRule[];
    fieldLayout: FieldLayout; // For 3D representation
}

export interface RosterSlotConfig {
    id: string;
    name: string;
    count: number;
    allowedPositions: string[]; // e.g., ['QB'] or ['RB', 'WR']
}

export interface ScoringRule {
    id: string;
    name: string;
    points: number;
    statKey: string; // e.g., 'passingYards'
}

export interface FieldLayout {
    type: 'football' | 'basketball' | 'soccer' | 'custom';
    dimensions: { width: number; length: number };
    zones: FieldZone[];
}

export interface FieldZone {
    id: string;
    name: string;
    position: [number, number, number]; // x, y, z
    size: [number, number, number];
}

export interface League {
    id: string;
    name: string;
    sportConfigId: string;
    teams: Team[];
}

export interface Team {
    id: string;
    name: string;
    ownerId: string;
    roster: Player[];
    theme?: {
        primaryColor: string;
        secondaryColor: string;
    };
}

export interface Player {
    id: string;
    name: string;
    position: string;
    stats: Record<string, number>; // e.g., { passingYards: 300 }
    modelId?: string; // ID for 3D model
}

export interface Matchup {
    id: string;
    leagueId: string;
    homeTeamId: string;
    awayTeamId: string;
    week: number;
    status: 'scheduled' | 'live' | 'final';
    score: { home: number; away: number };
}
