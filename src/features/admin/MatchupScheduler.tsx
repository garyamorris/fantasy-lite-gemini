import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../theme/ThemeContext';
import { Matchup } from '../../types/models';

export const MatchupScheduler: React.FC = () => {
    const { theme } = useTheme();
    const { leagues, addMatchup } = useStore(); // Note: need to add addMatchup to store
    const [selectedLeagueId, setSelectedLeagueId] = useState<string>(Object.keys(leagues)[0] || '');
    const [homeTeamId, setHomeTeamId] = useState('');
    const [awayTeamId, setAwayTeamId] = useState('');

    const handleCreateMatchup = () => {
        if (!selectedLeagueId || !homeTeamId || !awayTeamId || homeTeamId === awayTeamId) return;

        const newMatchup: Matchup = {
            id: `matchup-${Date.now()}`,
            leagueId: selectedLeagueId,
            homeTeamId,
            awayTeamId,
            week: 1,
            status: 'scheduled',
            score: { home: 0, away: 0 }
        };

        // @ts-ignore - addMatchup not yet in interface
        addMatchup(newMatchup);
    };

    const league = leagues[selectedLeagueId];
    const teams = league?.teams || [];

    if (!league) return null;

    return (
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.colors.background.paper }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>Schedule Matchup</h3>

            <div className="flex flex-col gap-4 mb-6">
                <select
                    value={selectedLeagueId}
                    onChange={(e) => setSelectedLeagueId(e.target.value)}
                    className="p-2 rounded border bg-transparent"
                    style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                >
                    {Object.values(leagues).map(l => (
                        <option key={l.id} value={l.id} className="text-black">{l.name}</option>
                    ))}
                </select>

                <div className="flex gap-4 items-center">
                    <select
                        value={homeTeamId}
                        onChange={(e) => setHomeTeamId(e.target.value)}
                        className="p-2 rounded border bg-transparent flex-grow"
                        style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                    >
                        <option value="" className="text-black">Select Home Team</option>
                        {teams.map(t => (
                            <option key={t.id} value={t.id} className="text-black">{t.name}</option>
                        ))}
                    </select>

                    <span className="font-bold">VS</span>

                    <select
                        value={awayTeamId}
                        onChange={(e) => setAwayTeamId(e.target.value)}
                        className="p-2 rounded border bg-transparent flex-grow"
                        style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                    >
                        <option value="" className="text-black">Select Away Team</option>
                        {teams.map(t => (
                            <option key={t.id} value={t.id} className="text-black">{t.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleCreateMatchup}
                    disabled={!homeTeamId || !awayTeamId || homeTeamId === awayTeamId}
                    className="px-4 py-2 rounded font-bold disabled:opacity-50"
                    style={{ backgroundColor: theme.colors.primary.main, color: theme.colors.text.primary }}
                >
                    Schedule Game
                </button>
            </div>
        </div>
    );
};
