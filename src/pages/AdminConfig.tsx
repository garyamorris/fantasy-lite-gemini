import React from 'react';
import { SportConfigEditor } from '../features/admin/SportConfigEditor';
import { LeagueManager } from '../features/admin/LeagueManager';

export const AdminConfig: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Admin Configuration</h2>
                <p className="mb-4">Configure sports rules and manage leagues.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SportConfigEditor />
                    <LeagueManager />
                </div>
            </div>
        </div>
    );
};
