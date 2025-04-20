import React from 'react';
import { Character } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onPlay: (id: number) => void;
  onDelete: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected,
  onSelect,
  onPlay,
  onDelete,
}) => {
  const {
    id,
    firstName,
    lastName,
    gender,
    jobLabel,
    cash,
    bank,
    citizenid,
    lastPlayed,
  } = character;

  return (
    <div
      className={`
        relative w-full cursor-pointer transition-all duration-300
        ${isSelected ? 'cyber-panel animate-glow border-l-4 border-l-yellow-500' : 'cyber-bg hover:cyber-panel'}
      `}
      onClick={() => onSelect(id)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="cyber-label mr-2">ID:</span>
            <span className="text-yellow-500 font-mono">{citizenid}</span>
          </div>
          <span className={`px-2 py-1 text-xs rounded ${gender === 'Male' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
            {gender}
          </span>
        </div>

        <h3 className="text-2xl cyber-text text-yellow-500 mb-4">
          {firstName} {lastName}
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="cyber-label">Job</span>
            <span className="text-gray-300">{jobLabel}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="cyber-label">Cash</span>
            <span className="text-green-400">{formatCurrency(cash)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="cyber-label">Bank</span>
            <span className="text-blue-400">{formatCurrency(bank)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="cyber-label">Last Active</span>
            <span className="text-gray-400">{lastPlayed}</span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="flex space-x-2 p-4 bg-black/50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(id);
            }}
            className="flex-1 cyber-button py-2 px-4 text-green-500 hover:text-green-400"
          >
            PLAY
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="flex-1 cyber-button py-2 px-4 text-red-500 hover:text-red-400"
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;