export type MeetingType =
  | 'testimony'
  | 'regular'
  | 'stake'
  | 'general'
  | 'special';

export type Hymn = {
  number: number;
  title: string;
};

export type Speaker = {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
};

export type WardBusiness = {
  description: string;
};

export type SacramentMeeting = {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusiness[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: Speaker[];
  closingHymn: Hymn;
  closingPrayer: string;
};