import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../theme/ThemeContext';

export const LeagueManager: React.FC = () => {
    const { theme } = useTheme();
    const { leagues, addLeague, sportConfigs } = useStore();
    const [newLeagueName, setNewLeagueName] = useState('');
    const [selectedSportId, setSelectedSportId] = useState(Object.keys(sportConfigs)[0]);

    const handleCreateLeague = () => {
        if (!newLeagueName) return;

        addLeague({
            id: `league-${Date.now()}`,
            name: newLeagueName,
            sportConfigId: selectedSportId,
            teams: []
        });
        setNewLeagueName('');
    };

    return (
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.colors.background.paper }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>Leagues</h3>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="New League Name"
                    value={newLeagueName}
                    onChange={(e) => setNewLeagueName(e.target.value)}
                    className="p-2 rounded border bg-transparent flex-grow"
                    style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                />
                <select
                    value={selectedSportId}
                    onChange={(e) => setSelectedSportId(e.target.value)}
                    className="p-2 rounded border bg-transparent"
                    style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                >
                    {Object.values(sportConfigs).map(config => (
                        <option key={config.id} value={config.id} className="text-black">{config.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleCreateLeague}
                    className="px-4 py-2 rounded font-bold"
                    style={{ backgroundColor: theme.colors.primary.main, color: theme.colors.text.primary }}
                >
                    Create
                </button>
            </div>

            <div className="space-y-2">
                {Object.values(leagues).map(league => (
                    <div key={league.id} className="p-3 rounded border flex justify-between items-center" style={{ borderColor: theme.colors.secondary.light }}>
                        <div>
                            <span className="font-bold block" style={{ color: theme.colors.text.primary }}>{league.name}</span>
                            <span className="text-sm" style={{ color: theme.colors.text.secondary }}>Sport: {sportConfigs[league.sportConfigId]?.name}</span>
                        </div>
                        <span className="text-sm" style={{ color: theme.colors.text.secondary }}>{league.teams.length} Teams</span>
                    </div>
                ))}
                {Object.keys(leagues).length === 0 && (
                    <p style={{ color: theme.colors.text.secondary }}>No leagues created yet.</p>
                )}
            </div>
        </div>
    );
};
