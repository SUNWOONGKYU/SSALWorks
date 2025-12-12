"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    isServiceIntroOpen: boolean;
    openServiceIntro: () => void;
    closeServiceIntro: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isServiceIntroOpen, setIsServiceIntroOpen] = useState(false);

    const openServiceIntro = () => setIsServiceIntroOpen(true);
    const closeServiceIntro = () => setIsServiceIntroOpen(false);

    return (
        <UIContext.Provider value={{ isServiceIntroOpen, openServiceIntro, closeServiceIntro }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
