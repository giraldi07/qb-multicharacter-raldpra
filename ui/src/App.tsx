import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import CharacterSelection from './pages/CharacterSelection';
import { Character } from './types';
import { listenForNuiMessages } from './utils/nui';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [maxSlots, setMaxSlots] = useState<number>(4);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  useEffect(() => {
    // Initialize NUI message listener
    listenForNuiMessages();
    
    // Setup event listeners for NUI events
    window.addEventListener('qb:setupCharacters', handleSetupCharacters);
    window.addEventListener('qb:refreshCharacters', handleRefreshCharacters);
    window.addEventListener('qb:openUI', handleOpenUI);
    window.addEventListener('qb:closeUI', handleCloseUI);
    
    // Only for development - mock data
    if (process.env.NODE_ENV !== 'production') {
      setupMockData();
    }
    
    return () => {
      window.removeEventListener('qb:setupCharacters', handleSetupCharacters);
      window.removeEventListener('qb:refreshCharacters', handleRefreshCharacters);
      window.removeEventListener('qb:openUI', handleOpenUI);
      window.removeEventListener('qb:closeUI', handleCloseUI);
    };
  }, []);
  
  const handleSetupCharacters = (event: Event) => {
    const { characters, maxSlots } = (event as CustomEvent).detail;
    setCharacters(characters);
    setMaxSlots(maxSlots || 4);
  };
  
  const handleRefreshCharacters = (event: Event) => {
    const { characters } = (event as CustomEvent).detail;
    setCharacters(characters);
  };
  
  const handleOpenUI = () => {
    setIsVisible(true);
  };
  
  const handleCloseUI = () => {
    setIsVisible(false);
  };
  
  const setupMockData = () => {
    const mockCharacters: Character[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        jobLabel: 'Unemployed',
        cash: 5000,
        bank: 10000,
        citizenid: 'ABC123',
        lastPlayed: '2 days ago',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: '1992-05-15',
        gender: 'Female',
        jobLabel: 'Police Officer',
        cash: 7500,
        bank: 25000,
        citizenid: 'DEF456',
        lastPlayed: '5 hours ago',
      },
    ];
    
    setCharacters(mockCharacters);
  };
  
  const handleRefresh = () => {
    // This would trigger a refresh from the server in production
    if (process.env.NODE_ENV !== 'production') {
      setupMockData();
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <Background>
      <div className="w-full h-screen flex items-center justify-center">
        <CharacterSelection
          characters={characters}
          maxSlots={maxSlots}
          onRefresh={handleRefresh}
        />
      </div>
    </Background>
  );
}

export default App;