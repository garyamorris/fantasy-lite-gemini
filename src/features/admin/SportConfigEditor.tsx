import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../theme/ThemeContext';
import { SportConfig } from '../../types/models';

export const SportConfigEditor: React.FC = () => {
    const { theme } = useTheme();
    const { sportConfigs, addSportConfig } = useStore();
    const [selectedConfigId, setSelectedConfigId] = useState<string>(Object.keys(sportConfigs)[0]);

    const activeConfig = sportConfigs[selectedConfigId];

    const handleSave = (config: SportConfig) => {
        addSportConfig(config);
    };

    return (
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.colors.background.paper }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>Sport Configuration</h3>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text.secondary }}>Select Sport</label>
                <select
                    value={selectedConfigId}
                    onChange={(e) => setSelectedConfigId(e.target.value)}
                    className="w-full p-2 rounded border bg-transparent"
                    style={{ borderColor: theme.colors.primary.main, color: theme.colors.text.primary }}
                >
                    {Object.values(sportConfigs).map(config => (
                        <option key={config.id} value={config.id} className="text-black">{config.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text.secondary }}>Sport Name</label>
                    <input
                        type="text"
                        value={activeConfig.name}
                        onChange={(e) => handleSave({ ...activeConfig, name: e.target.value })}
                        className="w-full p-2 rounded border bg-transparent"
                        style={{ borderColor: theme.colors.secondary.main, color: theme.colors.text.primary }}
                    />
                </div>

                {/* Roster Slots */}
                <div>
                    <h4 className="font-semibold mb-2" style={{ color: theme.colors.text.primary }}>Roster Slots</h4>
                    {activeConfig.rosterSlots.map((slot, idx) => (
                        <div key={slot.id} className="flex items-center gap-4 mb-2">
                            <input
                                value={slot.name}
                                onChange={(e) => {
                                    const newSlots = [...activeConfig.rosterSlots];
                                    newSlots[idx] = { ...slot, name: e.target.value };
                                    handleSave({ ...activeConfig, rosterSlots: newSlots });
                                }}
                                className="p-1 rounded border bg-transparent w-24"
                                style={{ borderColor: theme.colors.secondary.light, color: theme.colors.text.primary }}
                            />
                            <input
                                type="number"
                                value={slot.count}
                                onChange={(e) => {
                                    const newSlots = [...activeConfig.rosterSlots];
                                    newSlots[idx] = { ...slot, count: parseInt(e.target.value) };
                                    handleSave({ ...activeConfig, rosterSlots: newSlots });
                                }}
                                className="p-1 rounded border bg-transparent w-16"
                                style={{ borderColor: theme.colors.secondary.light, color: theme.colors.text.primary }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newSlots = [...activeConfig.rosterSlots, { id: `slot-${Date.now()}`, name: 'New Slot', count: 1, allowedPositions: [] }];
                            handleSave({ ...activeConfig, rosterSlots: newSlots });
                        }}
                        className="text-sm underline"
                        style={{ color: theme.colors.primary.light }}
                    >
                        + Add Slot
                    </button>
                </div>

                {/* Scoring Rules */}
                <div>
                    <h4 className="font-semibold mb-2" style={{ color: theme.colors.text.primary }}>Scoring Rules</h4>
                    {activeConfig.scoringRules.map((rule, idx) => (
                        <div key={rule.id} className="flex items-center gap-4 mb-2">
                            <input
                                value={rule.name}
                                onChange={(e) => {
                                    const newRules = [...activeConfig.scoringRules];
                                    newRules[idx] = { ...rule, name: e.target.value };
                                    handleSave({ ...activeConfig, scoringRules: newRules });
                                }}
                                className="p-1 rounded border bg-transparent w-32"
                                style={{ borderColor: theme.colors.secondary.light, color: theme.colors.text.primary }}
                            />
                            <input
                                type="number"
                                value={rule.points}
                                onChange={(e) => {
                                    const newRules = [...activeConfig.scoringRules];
                                    newRules[idx] = { ...rule, points: parseFloat(e.target.value) };
                                    handleSave({ ...activeConfig, scoringRules: newRules });
                                }}
                                className="p-1 rounded border bg-transparent w-16"
                                style={{ borderColor: theme.colors.secondary.light, color: theme.colors.text.primary }}
                            />
                            <span style={{ color: theme.colors.text.secondary }}>pts</span>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newRules = [...activeConfig.scoringRules, { id: `rule-${Date.now()}`, name: 'New Rule', points: 1, statKey: 'stat' }];
                            handleSave({ ...activeConfig, scoringRules: newRules });
                        }}
                        className="text-sm underline"
                        style={{ color: theme.colors.primary.light }}
                    >
                        + Add Rule
                    </button>
                </div>
            </div>
        </div>
    );
};
