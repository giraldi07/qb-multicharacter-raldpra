import React from 'react';
import { Character } from '../types';
import CharacterCard from './CharacterCard';
import { ChevronLeft, ChevronRight, Plus, Lock } from 'lucide-react';

interface CharacterListProps {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
  onPlayCharacter: (id: number) => void;
  onDeleteCharacter: (id: number) => void;
  maxSlots: number;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  onPlayCharacter,
  onDeleteCharacter,
  maxSlots,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        {characters.map((character, index) => (
          <div key={character.id} className="animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
            <CharacterCard
              character={character}
              isSelected={selectedCharacterId === character.id}
              onSelect={onSelectCharacter}
              onPlay={onPlayCharacter}
              onDelete={onDeleteCharacter}
            />
          </div>
        ))}
        
        {/* Empty character slots */}
        {Array.from({ length: maxSlots - characters.length }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="animate-slideInLeft"
            style={{ animationDelay: `${(characters.length + index) * 0.1}s` }}
          >
            <div 
              className="cyber-bg p-4 cursor-pointer hover:cyber-panel transition-all duration-300"
              onClick={() => onSelectCharacter(-1)}
            >
              <div className="flex items-center justify-center py-4">
                {index === 0 ? (
                  <>
                    <Plus className="w-6 h-6 text-yellow-500 mr-2" />
                    <span className="cyber-text text-yellow-500">Create Character</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6 text-gray-600 mr-2" />
                    <span className="cyber-text text-gray-600">Locked Slot</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;