import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db, getAll, deleteById, type ChatHistoryItem } from '~/lib/persistence';
import { IconButton } from '~/components/ui/IconButton';
import { useNavigate } from '@remix-run/react';

export function ProjectGrid() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ChatHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (db) {
            getAll(db)
                .then((list) => {
                    // Filter valid projects and sort by date (newest first)
                    const validProjects = list
                        .filter((item) => item.urlId && item.description)
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                    setProjects(validProjects);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!db) return;

        if (confirm('Are you sure you want to delete this project?')) {
            deleteById(db, id)
                .then(() => {
                    setProjects(prev => prev.filter(p => p.id !== id));
                    toast.success('Project deleted');
                })
                .catch(() => toast.error('Failed to delete'));
        }
    };

    if (loading) return null;
    if (projects.length === 0) return null;

    return (
        <div className="w-full max-w-chat mx-auto mt-12 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-elements-textPrimary">Your Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/chat/${project.urlId}`)}
                        className="group relative flex flex-col p-4 bg-purple-elements-background-depth-2 border border-purple-elements-borderColor rounded-xl hover:border-purple-elements-borderColorActive hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className="font-medium text-purple-elements-textPrimary truncate">
                                    {project.description}
                                </h3>
                                <p className="text-xs text-purple-elements-textTertiary mt-1">
                                    {new Date(project.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <IconButton
                                    icon="i-ph:trash"
                                    size="md"
                                    className="hover:text-red-500"
                                    onClick={(e) => handleDelete(e, project.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
