export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  jobLabel: string;
  cash: number;
  bank: number;
  citizenid: string;
  lastPlayed: string;
  slots?: number;
}

export interface NUIMessage {
  action: string;
  data: any;
}

export type NUICallback = (data: any) => void;