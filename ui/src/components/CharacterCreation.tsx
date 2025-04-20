import React, { useState } from 'react';
import Button from './ui/Button';

interface CharacterCreationProps {
  onCancel: () => void;
  onSubmit: (characterData: any) => void;
}


const CharacterCreation: React.FC<CharacterCreationProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dateOfBirth: '',
    nationality: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="w-full max-w-md mx-auto bg-gray-900/90 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Create New Character</h2>
        <p className="text-gray-400 text-sm mt-1">Step {currentStep} of {totalSteps}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-400 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-400 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-400 mb-1">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="secondary" onClick={handlePrevStep}>
              Back
            </Button>
          ) : (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button type="button" variant="primary" onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="success">
              Create Character
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CharacterCreation;