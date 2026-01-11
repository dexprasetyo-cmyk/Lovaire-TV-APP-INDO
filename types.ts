export type StreamStatus = 'Online' | 'Offline';
export type StreamLimit = 'No Limit' | 'Limit';

export interface Channel {
  id: string;
  name: string;
  url: string;
  status: StreamStatus;
  limit: StreamLimit;
  category?: string;
}
