'use client';

import { useAuth } from '@/context/AuthContext';

export default function ScaleProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const isElderly = user?.name === 'Opa Adriel';
    const scale = isElderly ? 1.2 : 0.85;

    return (
        <div style={{ '--ui-scale': scale } as React.CSSProperties}>
            {children}
        </div>
    );
}