import React, { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import CharacterCreation from '../components/CharacterCreation';
import { Character } from '../types';
import { sendNuiMessage } from '../utils/nui';
import { X } from 'lucide-react';

// import audio bg
import FileAudio from '../assets/audio/musicbg.mp3';
// Logo
import LogoImage from '../assets/icons/myLogo.png';

interface CharacterSelectionProps {
  characters: Character[];
  maxSlots: number;
  onRefresh: () => void;
}



const CharacterSelection: React.FC<CharacterSelectionProps> = ({ 
  characters,
  maxSlots,
  onRefresh 
}) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Untuk audio background
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        setIsPlaying(false); // autoplay block fallback
      });
    }
  }, []);
  
  
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  const handleSelectCharacter = (id: number) => {
    if (id === -1) {
      setIsCreatingCharacter(true);
    } else {
      setSelectedCharacterId(id);
      sendNuiMessage('cameraPointToCharacter', { id });
    }
  };
  
  const handlePlayCharacter = (id: number) => {
    sendNuiMessage('selectCharacter', { id });
  };
  
  const handleDeleteCharacter = (id: number) => {
    if (confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      sendNuiMessage('deleteCharacter', { id });
      setSelectedCharacterId(null);
    }
  };
  
  const handleCreateCharacter = (characterData: any) => {
    sendNuiMessage('createCharacter', characterData);
    setIsCreatingCharacter(false);
    onRefresh();
  };
  
  const handleCloseUI = () => {
    console.log('Close button clicked'); // 👈 cek dulu ini muncul gak
    sendNuiMessage('closeUI');
  };
  
  return (
    <div className={`fixed inset-0 flex ${animateIn ? 'animate-fadeIn' : 'opacity-0'}`}>

      {/*  Audio Musik Background */}
      <div className="fixed top-6 left-[50vw] transform -translate-x-1/2 z-50">
          <h3 className="cyber-label text-yellow-500 mb-2">Background Music</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (!audioRef.current) return;
                if (isPlaying) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }}
              className="cyber-button px-2 py-1"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => {
                if (!audioRef.current) return;
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }}
              className="cyber-button px-2 py-1"
            >
              Stop
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setVolume(vol);
                if (audioRef.current) {
                  audioRef.current.volume = vol;
                }
              }}
              className="w-24"
            />
          </div>
       </div>

      {/* Left side - Character list */}
      <div className="w-[400px] h-full bg-black/40 backdrop-blur-sm p-6 border-r border-yellow-500/20">
        <div className="mb-8">
          <h1 className="text-5xl cyber-text text-yellow-500 mb-2">BlossomBiz</h1>
          <div className="cyber-button inline-block px-4 py-1">
            <span className="text-yellow-500 text-sm tracking-[0.2em]">CHARACTER SELECTOR</span>
          </div>
        </div>
        
        <CharacterList
          characters={characters}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={handleSelectCharacter}
          onPlayCharacter={handlePlayCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          maxSlots={maxSlots}
        />

      </div>

      {/* Center - Character preview */}
      <div className="flex-1 relative">
        {selectedCharacterId && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[600px] animate-slideInUp">
            <div className="cyber-panel p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Left column - Stats */}
                <div className="space-y-4">
                  <h3 className="cyber-text text-yellow-500 text-xl mb-4">Character Stats</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Health', value: '100%', color: 'bg-red-500' },
                      { label: 'Armor', value: '75%', color: 'bg-blue-500' },
                      { label: 'Stamina', value: '90%', color: 'bg-green-500' }
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="cyber-label">{stat.label}</span>
                          <span className="text-white">{stat.value}</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded">
                          <div className={`h-full ${stat.color} rounded`} style={{ width: stat.value }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Info */}
                <div className="space-y-4">
                  <h3 className="cyber-text text-yellow-500 text-xl mb-4">Character Info</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Level', value: '15' },
                      { label: 'Experience', value: '2,450 XP' },
                      { label: 'Reputation', value: 'Neutral' }
                    ].map((info) => (
                      <div key={info.label} className="flex justify-between items-center">
                        <span className="cyber-label">{info.label}</span>
                        <span className="text-white">{info.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Character details */}
      <div className="w-[400px] h-full bg-black/40 backdrop-blur-sm p-6 border-l border-yellow-500/20">
        {isCreatingCharacter ? (
          <div className="animate-slideInRight">
            <CharacterCreation
              onCancel={() => setIsCreatingCharacter(false)}
              onSubmit={handleCreateCharacter}
            />
          </div>
        ) : selectedCharacterId && (
          <div className="animate-slideInRight">
            <h2 className="cyber-text text-yellow-500 text-2xl mb-6">Character Details</h2>
            <div className="space-y-6">
              {/* Identity Section */}
              <div className="cyber-panel p-4">
                <h3 className="cyber-label mb-4">Identity</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Date of Birth', value: '2511-02-05' },
                    { label: 'Nationality', value: 'Turk' },
                    { label: 'Phone', value: '5109358855' }
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between items-center">
                      <span className="text-gray-400">{detail.label}</span>
                      <span className="text-white">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Section */}
              <div className="cyber-panel p-4">
                <h3 className="cyber-label mb-4">Account</h3>
                <div className="space-y-2">
                  {[
                    { label: 'ID', value: 'US04TR403997' },
                    { label: 'Created', value: '30 days ago' },
                    { label: 'Last Login', value: '2 hours ago' }
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between items-center">
                      <span className="text-gray-400">{detail.label}</span>
                      <span className="text-white">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logo + Copyright */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <img 
            src={LogoImage} 
            alt="Logo" 
            className="w-10 h-auto drop-shadow-lg" 
          />
          <p className="text-yellow-500 text-sm cyber-label whitespace-nowrap">
            © 2025 BlossomBiz RP. All rights reserved.
          </p>
        </div>
      </div>

      {/* Close button */}
      <button 
        onClick={handleCloseUI}
        className="absolute top-4 right-4 cyber-button p-2 text-yellow-500 hover:text-yellow-400"
      >
        <X className="w-6 h-6" />
      </button>


      {/* Musick Background */}
      <audio
          ref={audioRef}
          src={FileAudio}
          loop
          hidden
      />
    </div>
  );
};

export default CharacterSelection;