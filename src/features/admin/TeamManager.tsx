import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../theme/ThemeContext';
import { Team } from '../../types/models';

export const TeamManager: React.FC = () => {
    const { theme } = useTheme();
    const { leagues, addTeamToLeague } = useStore();
    const [selectedLeagueId, setSelectedLeagueId] = useState<string>(Object.keys(leagues)[0] || '');
    const [newTeamName, setNewTeamName] = useState('');

    // Auto-select league when created
    React.useEffect(() => {
        if (!selectedLeagueId && Object.keys(leagues).length > 0) {
            setSelectedLeagueId(Object.keys(leagues)[0]);
        }
    }, [leagues, selectedLeagueId]);

    const generateMockRoster = (): Team['roster'] => {
        const positions = ['QB', 'RB', 'RB', 'WR', 'WR', 'TE'];
        return positions.map((pos, idx) => ({
            id: `player-${Date.now()}-${idx}`,
            name: `${pos} Player ${idx + 1}`,
            position: pos,
            stats: { points: Math.floor(Math.random() * 20) }
        }));
    };

    const handleCreateTeam = () => {
        if (!newTeamName || !selectedLeagueId) return;

        const newTeam: Team = {
            id: `team-${Date.now()}`,
            name: newTeamName,
            ownerId: 'user-1', // Mock owner
            roster: generateMockRoster(),
            theme: {
                primaryColor: '#ef4444', // Default red
                secondaryColor: '#ffffff'
            }
        };

        addTeamToLeague(selectedLeagueId, newTeam);
        setNewTeamName('');
    };

    if (Object.keys(leagues).length === 0) {
        return (
            <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.colors.background.paper }}>
                <p style={{ color: theme.colors.text.secondary }}>Create a league first to add teams.</p>
            </div>
        );
    }

    const selectedLeague = leagues[selectedLeagueId];

    return (
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.colors.background.paper }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>Teams</h3>

            <div className="flex gap-4 mb-6">
                <select
                    value={selectedLeagueId}
                    onChange={(e) => setSelectedLeagueId(e.target.value)}
                    className="p-2 rounded border bg-transparent"
                    style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                >
                    {Object.values(leagues).map(league => (
                        <option key={league.id} value={league.id} className="text-black">{league.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="New Team Name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="p-2 rounded border bg-transparent flex-grow"
                    style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                />
                <button
                    onClick={handleCreateTeam}
                    className="px-4 py-2 rounded font-bold"
                    style={{ backgroundColor: theme.colors.primary.main, color: theme.colors.text.primary }}
                >
                    Add Team
                </button>
            </div>

            <div className="space-y-2">
                {selectedLeague?.teams.map(team => (
                    <div key={team.id} className="p-3 rounded border flex justify-between items-center" style={{ borderColor: theme.colors.secondary.light }}>
                        <span className="font-bold" style={{ color: theme.colors.text.primary }}>{team.name}</span>
                        <span className="text-sm" style={{ color: theme.colors.text.secondary }}>Roster: {team.roster.length} Players</span>
                    </div>
                ))}
                {(!selectedLeague || selectedLeague.teams.length === 0) && (
                    <p style={{ color: theme.colors.text.secondary }}>No teams in this league yet.</p>
                )}
            </div>
        </div>
    );
};
