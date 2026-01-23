
export type Status = 'Scheduled' | 'Completed' | 'Pending' | 'Cancelled';

export interface Staff {
  name: string;
  role: string;
  avatar: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  relativeDate: string;
  status: Status;
  staff: Staff;
  icon: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  summary: string;
  history: TimelineEvent[];
}

export const MOCK_HISTORY: TimelineEvent[] = [
  {
    id: '1',
    title: 'Orthodontic Adjustment',
    description: 'Monthly realignment and wire check.',
    date: 'Oct 24, 2025',
    time: '10:30 AM',
    relativeDate: 'Next Week',
    status: 'Scheduled',
    icon: 'event',
    staff: {
      name: 'Dr. Sarah Smith',
      role: 'Orthodontist',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: '2',
    title: 'Root Canal Treatment',
    description: 'Lower left molar therapy. Successfully sealed.',
    date: 'Sep 22, 2025',
    time: '09:15 AM',
    relativeDate: 'Last Month',
    status: 'Completed',
    icon: 'check_circle',
    staff: {
      name: 'Dr. James Wilson',
      role: 'Periodontist',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  },
  {
    id: '3',
    title: 'Routine Hygiene',
    description: 'Regular 6-month cleaning. No new cavities noted.',
    date: 'Jun 05, 2025',
    time: '08:00 AM',
    relativeDate: 'Early Summer',
    status: 'Scheduled',
    icon: 'info',
    staff: {
      name: 'Dr. Sarah Smith',
      role: 'Dental Hygienist',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: '4',
    title: 'Scale & Polish',
    description: 'Comprehensive dental cleaning and polishing.',
    date: 'May 10, 2025',
    time: '02:30 PM',
    relativeDate: 'Spring',
    status: 'Completed',
    icon: 'check_circle',
    staff: {
      name: 'Dr. Michael Chen',
      role: 'Hygienist',
      avatar: 'https://i.pravatar.cc/150?img=33'
    }
  },
  {
    id: '5',
    title: 'Dental X-Ray',
    description: 'Full mouth radiographic examination.',
    date: 'Apr 18, 2025',
    time: '11:00 AM',
    relativeDate: 'Spring',
    status: 'Completed',
    icon: 'check_circle',
    staff: {
      name: 'Dr. Emily Rodriguez',
      role: 'Radiologist',
      avatar: 'https://i.pravatar.cc/150?img=9'
    }
  },
  {
    id: '6',
    title: 'Crown Placement',
    description: 'Porcelain crown fitted on upper molar.',
    date: 'Mar 22, 2025',
    time: '03:45 PM',
    relativeDate: 'Early Spring',
    status: 'Completed',
    icon: 'check_circle',
    staff: {
      name: 'Dr. James Wilson',
      role: 'Prosthodontist',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  }
];
