import { useState } from 'react';

export const useActiveTabState = () => {
    const [activeTabState, setActiveTabState] = useState<any>({});

    const updateActiveTabState = (state: any) => {
        setActiveTabState((prevState: any) => {
            return { ...prevState, ...state };
        });
    };

    const addActiveTabState = (operation) => {
        setActiveTabState((prevState: any) => { return { ...prevState, ...operation } });
    };

    return {
        activeTabState,
        addActiveTabState,
        updateActiveTabState,
        setActiveTabState
    };
};
