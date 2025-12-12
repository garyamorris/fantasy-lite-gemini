import React, { useEffect, useState } from 'react';
import { Scene } from '../components/3d/Scene';
import { Stadium } from '../components/3d/Stadium';
import { PlayerModel } from '../components/3d/PlayerModel';
import { useTheme } from '../theme/ThemeContext';
import { useStore } from '../store/useStore';
import { Matchup } from '../types/models';

export const Matchup3D: React.FC = () => {
    const { theme } = useTheme();
    const { matchups, leagues } = useStore();
    const [activeMatchup, setActiveMatchup] = useState<Matchup | null>(null);

    // Auto-select the last created matchup for demo purposes
    useEffect(() => {
        const matchupIds = Object.keys(matchups);
        if (matchupIds.length > 0) {
            setActiveMatchup(matchups[matchupIds[matchupIds.length - 1]]);
        }
    }, [matchups]);

    if (!activeMatchup) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>No Active Matchup</h2>
                <p style={{ color: theme.colors.text.secondary }}>Go to Admin configuration to schedule a game.</p>
            </div>
        );
    }

    const league = leagues[activeMatchup.leagueId];
    const homeTeam = league?.teams.find(t => t.id === activeMatchup.homeTeamId);
    const awayTeam = league?.teams.find(t => t.id === activeMatchup.awayTeamId);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: theme.colors.text.primary }}>Live Matchup</h2>
                <div className="flex gap-4">
                    <div className="text-center">
                        <div className="text-sm" style={{ color: theme.colors.text.secondary }}>{homeTeam?.name || 'HOME'}</div>
                        <div className="text-2xl font-bold" style={{ color: theme.colors.primary.main }}>{activeMatchup.score.home}</div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.text.secondary }}>VS</div>
                    <div className="text-center">
                        <div className="text-sm" style={{ color: theme.colors.text.secondary }}>{awayTeam?.name || 'AWAY'}</div>
                        <div className="text-2xl font-bold" style={{ color: theme.colors.secondary.main }}>{activeMatchup.score.away}</div>
                    </div>
                </div>
            </div>

            <Scene>
                <Stadium />

                {/* Home Team - 3 Players */}
                <PlayerModel position={[-5, 0, 10]} isHome={true} color={homeTeam?.theme?.primaryColor} />
                <PlayerModel position={[0, 0, 12]} isHome={true} color={homeTeam?.theme?.primaryColor} />
                <PlayerModel position={[5, 0, 10]} isHome={true} color={homeTeam?.theme?.primaryColor} />

                {/* Away Team - 3 Players */}
                <PlayerModel position={[-5, 0, -10]} isHome={false} color={awayTeam?.theme?.primaryColor} />
                <PlayerModel position={[0, 0, -12]} isHome={false} color={awayTeam?.theme?.primaryColor} />
                <PlayerModel position={[5, 0, -10]} isHome={false} color={awayTeam?.theme?.primaryColor} />
            </Scene>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded border" style={{ borderColor: theme.colors.primary.main, backgroundColor: theme.colors.background.paper }}>
                    <h3 className="font-bold mb-2">{homeTeam?.name} Roster</h3>
                    <ul className="space-y-2 text-sm">
                        {homeTeam?.roster.length === 0 ? <li>No players on roster</li> : homeTeam?.roster.map(p => (
                            <li key={p.id}>{p.name} - {p.position}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 rounded border" style={{ borderColor: theme.colors.secondary.main, backgroundColor: theme.colors.background.paper }}>
                    <h3 className="font-bold mb-2">{awayTeam?.name} Roster</h3>
                    <ul className="space-y-2 text-sm">
                        {awayTeam?.roster.length === 0 ? <li>No players on roster</li> : awayTeam?.roster.map(p => (
                            <li key={p.id}>{p.name} - {p.position}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
