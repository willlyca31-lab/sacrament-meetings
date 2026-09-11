import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Williams',
    announcements: [
      'Ward temple night will be September 18.',
      'Youth activity Wednesday at 6:30 PM.'
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God'
    },
    openingPrayer: 'Sister Garcia',
    wardBusiness: [
      {
        description: 'Sustaining of new Primary teachers'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [
      {
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Elder Martinez',
        topic: 'Following the Savior',
        type: 'speaker'
      },
      {
        name: 'Ward Choir',
        topic: 'Come, Follow Me',
        type: 'musical-number'
      }
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past'
    },
    closingPrayer: 'Brother Davis'
  },

  {
    id: 2,
    date: '2026-08-30',
    meetingType: 'testimony',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Carter',
    announcements: [
      'Fast Sunday donations may be submitted after the meeting.'
    ],
    openingHymn: {
      number: 81,
      title: 'Press Forward, Saints'
    },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [],
    closingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today'
    },
    closingPrayer: 'Brother Miller'
  },

  {
    id: 3,
    date: '2026-08-23',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Sister Wilson',
    announcements: [
      'Primary activity will be held Saturday morning.'
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    openingPrayer: 'Brother Smith',
    wardBusiness: [
      {
        description: 'Sustaining of new Relief Society presidency'
      }
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 190,
      title: 'In Memory of the Crucified'
    },
    speakers: [
      {
        name: 'Brother Thompson',
        topic: 'Service in the Kingdom',
        type: 'speaker'
      },
      {
        name: 'Sister Lopez',
        topic: 'The Power of Prayer',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 152,
      title: 'God Be with You Till We Meet Again'
    },
    closingPrayer: 'Sister Adams'
  },

  {
    id: 4,
    date: '2026-08-16',
    meetingType: 'stake',
    presiding: 'President Roberts',
    conducting: 'President Green',
    announcements: [
      'Stake conference will be held next month.'
    ],
    openingHymn: {
      number: 27,
      title: 'Praise to the Man'
    },
    openingPrayer: 'Sister Taylor',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [
      {
        name: 'President Roberts',
        topic: 'Strengthening Families',
        type: 'speaker'
      },
      {
        name: 'Sister Young',
        topic: 'Serving Others',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much'
    },
    closingPrayer: 'Brother Clark'
  },

  {
    id: 5,
    date: '2026-08-09',
    meetingType: 'general',
    presiding: 'President Anderson',
    conducting: 'Brother Lewis',
    announcements: [
      'General meeting announcements will be shared by the stake.'
    ],
    openingHymn: {
      number: 3,
      title: 'Now We Sing with One Accord'
    },
    openingPrayer: 'Brother Evans',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [
      {
        name: 'President Anderson',
        topic: 'Jesus Christ Is Our Savior',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    closingPrayer: 'Sister Moore'
  }
];

export function getMeetings(
  date?: string | null
): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(
  id: number
): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}