import { useStore } from '@nanostores/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { chatStore } from '~/lib/stores/chat';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('ModelSelector');

interface Model {
    id: string;
    name: string;
    description?: string;
    context_length?: number;
}

export function ModelSelector() {
    const { model } = useStore(chatStore);
    const [availableModels, setAvailableModels] = useState<Model[]>([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);

    useEffect(() => {
        const fetchModels = async () => {
            setIsLoadingModels(true);
            try {
                const response = await fetch('https://openrouter.ai/api/v1/models');
                if (!response.ok) {
                    throw new Error('Failed to fetch models');
                }
                const data = (await response.json()) as { data: Model[] };
                setAvailableModels(data.data.sort((a: Model, b: Model) => a.name.localeCompare(b.name)));
            } catch (error) {
                logger.error('Failed to fetch OpenRouter models', error);
                toast.error('Failed to fetch OpenRouter models');
            } finally {
                setIsLoadingModels(false);
            }
        };
        fetchModels();
    }, []);

    const handleModelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        chatStore.setKey('model', e.target.value);
    }, []);

    return (
        <div className="mb-2 flex gap-2 items-center text-sm">
            <label className="text-purple-elements-textSecondary text-xs">Model:</label>
            {isLoadingModels ? (
                <div className="text-purple-elements-textTertiary text-xs">Loading...</div>
            ) : (
                <select
                    value={model}
                    onChange={handleModelChange}
                    className="flex-1 max-w-[200px] bg-purple-elements-background-depth-2 text-purple-elements-textPrimary rounded px-2 py-1 border border-purple-elements-borderColor focus:outline-none text-xs"
                >
                    {availableModels.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            )}
        </div>
    );
}
