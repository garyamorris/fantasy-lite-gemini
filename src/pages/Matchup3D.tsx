import React from 'react';
import { Scene } from '../components/3d/Scene';
import { Stadium } from '../components/3d/Stadium';
import { PlayerModel } from '../components/3d/PlayerModel';
import { useTheme } from '../theme/ThemeContext';

export const Matchup3D: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: theme.colors.text.primary }}>Live Matchup</h2>
                <div className="flex gap-4">
                    <div className="text-center">
                        <div className="text-sm" style={{ color: theme.colors.text.secondary }}>HOME</div>
                        <div className="text-2xl font-bold" style={{ color: theme.colors.primary.main }}>24</div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.text.secondary }}>VS</div>
                    <div className="text-center">
                        <div className="text-sm" style={{ color: theme.colors.text.secondary }}>AWAY</div>
                        <div className="text-2xl font-bold" style={{ color: theme.colors.secondary.main }}>17</div>
                    </div>
                </div>
            </div>

            <Scene>
                <Stadium />

                {/* Home Team */}
                <PlayerModel position={[-5, 0, 10]} isHome={true} />
                <PlayerModel position={[0, 0, 12]} isHome={true} />
                <PlayerModel position={[5, 0, 10]} isHome={true} />

                {/* Away Team */}
                <PlayerModel position={[-5, 0, -10]} isHome={false} />
                <PlayerModel position={[0, 0, -12]} isHome={false} />
                <PlayerModel position={[5, 0, -10]} isHome={false} />
            </Scene>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded border" style={{ borderColor: theme.colors.primary.main, backgroundColor: theme.colors.background.paper }}>
                    <h3 className="font-bold mb-2">Home Roster</h3>
                    <ul className="space-y-2 text-sm">
                        <li>QB: Player 1 (20 pts)</li>
                        <li>RB: Player 2 (12 pts)</li>
                    </ul>
                </div>
                <div className="p-4 rounded border" style={{ borderColor: theme.colors.secondary.main, backgroundColor: theme.colors.background.paper }}>
                    <h3 className="font-bold mb-2">Away Roster</h3>
                    <ul className="space-y-2 text-sm">
                        <li>QB: Player A (15 pts)</li>
                        <li>RB: Player B (8 pts)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
