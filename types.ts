export interface AudioState {
  isPlaying: boolean;
  isListening: boolean;
  volume: number;
}

export interface LeadDetails {
  name: string;
  phone: string;
  address?: string;
  type: 'emergency' | 'rebate' | 'general';
  heatingSource?: 'gas' | 'oil' | 'electric';
  status: 'collecting' | 'complete';
}

export interface ServiceMetric {
  name: string;
  value: number;
  unit: string;
}