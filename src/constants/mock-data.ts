import type {
  TreeNode,
  CountryData,
  Task,
  Assignee,
  User,
  TrafficDataPoint,
  AnalyticsMetric,
  ReferrerData,
  DeviceData,
  AnalyticsOverview
} from '@/types/mock-data.type'

export const mockUserRoles = ['Admin', 'Manager', 'Cashier', 'Superadmin'] as const

export const mockUsersSpark = [12, 13, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 16, 17, 18]

export const mockConvSpark = [8, 7, 9, 7, 6, 7, 6, 6, 7, 5, 6, 5, 5, 5, 4, 4, 3]

export const mockEventSpark = [10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10]

export const mockSessionsA = [
  900, 1800, 1200, 2500, 4200, 3800, 5200, 6100, 7200, 6800, 9100, 9800, 12000, 13500, 15000, 13800, 16000, 17500,
  19000, 20500, 19800, 21500, 22500, 23500, 24500, 25500
]

export const mockSessionsB = mockSessionsA.map((v) => Math.max(0, Math.round(v * 0.6 + (Math.random() - 0.5) * 1200)))

export const mockSessionsC = mockSessionsA.map((v) => Math.max(0, Math.round(v * 0.35 + (Math.random() - 0.5) * 800)))

export const mockPageViews = [10000, 10500, 8200, 11000, 12500, 8400, 7200]

export const mockDownloads = [2500, 3200, 2800, 4100, 5200, 3000, 2600]

export const mockTreeData: TreeNode[] = [
  {
    id: 'website',
    label: 'Website',
    type: 'parent',
    children: [
      { id: 'home', label: 'Home', type: 'leaf', dotColor: 'green' },
      { id: 'pricing', label: 'Pricing', type: 'leaf', dotColor: 'green' },
      { id: 'about', label: 'About us', type: 'leaf', dotColor: 'green' },
      {
        id: 'blog',
        label: 'Blog',
        type: 'parent',
        children: [
          { id: 'announcements', label: 'Announcements', type: 'leaf', dotColor: 'blue' },
          { id: 'april-lookahead', label: 'April lookahead', type: 'leaf', dotColor: 'blue' },
          { id: 'whats-new', label: "What's new", type: 'leaf', dotColor: 'blue' },
          { id: 'meet-the-team', label: 'Meet the team', type: 'leaf', dotColor: 'blue' }
        ]
      }
    ]
  },
  {
    id: 'store',
    label: 'Store',
    type: 'parent',
    children: [
      { id: 'all-products', label: 'All products', type: 'leaf', dotColor: 'green' },
      {
        id: 'categories',
        label: 'Categories',
        type: 'parent',
        children: [
          { id: 'gadgets', label: 'Gadgets', type: 'leaf', dotColor: 'blue' },
          { id: 'phones', label: 'Phones', type: 'leaf', dotColor: 'blue' },
          { id: 'wearables', label: 'Wearables', type: 'leaf', dotColor: 'blue' }
        ]
      },
      { id: 'bestsellers', label: 'Bestsellers', type: 'leaf', dotColor: 'green' },
      { id: 'sales', label: 'Sales', type: 'leaf', dotColor: 'green' }
    ]
  },
  { id: 'contact', label: 'Contact', type: 'leaf', dotColor: 'blue' },
  { id: 'help', label: 'Help', type: 'leaf', dotColor: 'blue' }
]

export const mockCountryData: CountryData[] = [
  { id: 'india', country: 'India', percentage: 50, color: '#027af2', flag: '🇮🇳', countryCode: 'IN' },
  { id: 'usa', country: 'USA', percentage: 35, color: '#4da6ff', flag: '🇺🇸', countryCode: 'US' },
  { id: 'brazil', country: 'Brazil', percentage: 10, color: '#5eaa22', flag: '🇧🇷', countryCode: 'BR' },
  { id: 'other', country: 'Other', percentage: 5, color: '#94a0b8', flag: '🌍' }
]

export const mockAssignees: Assignee[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: '4', name: 'Bob Williams', email: 'bob.williams@example.com' },
  { id: '5', name: 'Charlie Brown', email: 'charlie.brown@example.com' },
  { id: '6', name: 'Diana Prince', email: 'diana.prince@example.com' },
  { id: '7', name: 'Edward Norton', email: 'edward.norton@example.com' },
  { id: '8', name: 'Fiona Apple', email: 'fiona.apple@example.com' },
  { id: '9', name: 'George Lucas', email: 'george.lucas@example.com' }
]

export const mockTotalUsers = 98500

export const mockTasks: Task[] = [
  {
    id: 'TASK-9366',
    title: 'Auctus bardus minus pariatur vobis solitudo tamquam solitudo.',
    category: 'Documentation',
    status: 'Canceled',
    priority: 'Low',
    description: 'Documentation task that was canceled due to scope changes',
    assignee: 'John Doe',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:20:00Z'
  },
  {
    id: 'TASK-5736',
    title: 'Admoneo vehemens suscipit toties desidero tollo allatus blanditiis caute.',
    category: 'Bug',
    status: 'Canceled',
    priority: 'Medium',
    description: 'Bug report that was determined to be a non-issue after investigation',
    assignee: 'Jane Smith',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'TASK-7918',
    title: 'Ulterius vir amita verbum condico trepide velociter adicio autus claustru.',
    category: 'Documentation',
    status: 'Done',
    priority: 'High',
    description: 'High priority documentation update completed successfully',
    assignee: 'Alice Johnson',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-12T17:30:00Z',
    dueDate: '2024-01-15T00:00:00Z'
  },
  {
    id: 'TASK-6498',
    title: 'Armarium atrocitas ustilo clam numquam defetiscor cunctatio vaco sua.',
    category: 'Bug',
    status: 'In Progress',
    priority: 'Low',
    description: 'Low priority bug fix currently being worked on',
    assignee: 'Bob Williams',
    createdAt: '2024-01-20T11:20:00Z',
    updatedAt: '2024-01-22T09:10:00Z',
    dueDate: '2024-02-01T00:00:00Z'
  },
  {
    id: 'TASK-9957',
    title: 'Aspicio tempora aegrus sufficio delicate abstergo.',
    category: 'Documentation',
    status: 'Canceled',
    priority: 'Low',
    description: 'Documentation task canceled due to duplicate work',
    assignee: 'Charlie Brown',
    createdAt: '2024-01-18T13:45:00Z',
    updatedAt: '2024-01-19T10:30:00Z'
  },
  {
    id: 'TASK-4715',
    title: 'Solutio cohaero baiulus brevis animadverto adfero adeo callide calco qu.',
    category: 'Bug',
    status: 'Canceled',
    priority: 'Medium',
    description: 'Bug fix canceled as it was resolved in a different ticket',
    assignee: 'Diana Prince',
    createdAt: '2024-01-12T15:00:00Z',
    updatedAt: '2024-01-16T11:20:00Z'
  },
  {
    id: 'TASK-7138',
    title: 'Usitas tardus aliquid comprehendo cupiditas a patria statim copiose crux.',
    category: 'Feature',
    status: 'Done',
    priority: 'Low',
    description: 'Feature implementation completed and deployed',
    assignee: 'Edward Norton',
    createdAt: '2024-01-08T07:30:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    dueDate: '2024-01-20T00:00:00Z'
  },
  {
    id: 'TASK-3344',
    title: 'Ventosus cetera turba auxilium comptus vindico dicta culpo.',
    category: 'Feature',
    status: 'Todo',
    priority: 'Medium',
    description: 'New feature request pending assignment',
    assignee: 'Fiona Apple',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
    dueDate: '2024-02-10T00:00:00Z'
  },
  {
    id: 'TASK-8090',
    title: 'Recusandae benigne acervus quis sapiente sapiente.',
    category: 'Feature',
    status: 'Backlog',
    priority: 'Medium',
    description: 'Feature request added to backlog for future consideration',
    assignee: undefined,
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: 'TASK-5402',
    title: 'Quod aperte considero rem verto aliqua aequitas cupio bibo eius labore.',
    category: 'Bug',
    status: 'In Progress',
    priority: 'Low',
    description: 'Bug fix in progress, expected completion soon',
    assignee: 'George Lucas',
    createdAt: '2024-01-19T14:30:00Z',
    updatedAt: '2024-01-23T08:15:00Z',
    dueDate: '2024-01-30T00:00:00Z'
  },
  {
    id: 'TASK-1234',
    title: 'Implement user authentication system with OAuth2 support.',
    category: 'Feature',
    status: 'In Progress',
    priority: 'High',
    description: 'Critical feature for user authentication and authorization',
    assignee: 'Alice Johnson',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-23T16:30:00Z',
    dueDate: '2024-02-05T00:00:00Z'
  },
  {
    id: 'TASK-5678',
    title: 'Fix memory leak in dashboard component causing performance issues.',
    category: 'Bug',
    status: 'Todo',
    priority: 'High',
    description: 'Critical bug affecting application performance',
    assignee: 'Bob Williams',
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
    dueDate: '2024-01-28T00:00:00Z'
  },
  {
    id: 'TASK-9012',
    title: 'Update API documentation for v2.0 release.',
    category: 'Documentation',
    status: 'In Progress',
    priority: 'Medium',
    description: 'Documentation update for upcoming API version',
    assignee: 'Charlie Brown',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-23T13:20:00Z',
    dueDate: '2024-02-01T00:00:00Z'
  },
  {
    id: 'TASK-3456',
    title: 'Add dark mode toggle to user settings page.',
    category: 'Feature',
    status: 'Done',
    priority: 'Medium',
    description: 'User-requested feature for theme customization',
    assignee: 'Diana Prince',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
    dueDate: '2024-01-18T00:00:00Z'
  },
  {
    id: 'TASK-7890',
    title: 'Resolve CORS error when accessing external API endpoints.',
    category: 'Bug',
    status: 'Done',
    priority: 'High',
    description: 'Critical bug preventing API integration',
    assignee: 'Edward Norton',
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-10T17:00:00Z',
    dueDate: '2024-01-12T00:00:00Z'
  },
  {
    id: 'TASK-2345',
    title: 'Create user guide for new dashboard features.',
    category: 'Documentation',
    status: 'Todo',
    priority: 'Low',
    description: 'User documentation for recently added features',
    assignee: 'Fiona Apple',
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z',
    dueDate: '2024-02-15T00:00:00Z'
  },
  {
    id: 'TASK-6789',
    title: 'Optimize database queries for faster page load times.',
    category: 'Feature',
    status: 'Backlog',
    priority: 'Medium',
    description: 'Performance improvement feature',
    assignee: undefined,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: 'TASK-0123',
    title: 'Fix typo in error message displayed to users.',
    category: 'Bug',
    status: 'Done',
    priority: 'Low',
    description: 'Minor text correction',
    assignee: 'George Lucas',
    createdAt: '2024-01-18T08:30:00Z',
    updatedAt: '2024-01-18T09:00:00Z',
    dueDate: '2024-01-19T00:00:00Z'
  },
  {
    id: 'TASK-4567',
    title: 'Add unit tests for authentication module.',
    category: 'Feature',
    status: 'In Progress',
    priority: 'Medium',
    description: 'Improve test coverage for critical module',
    assignee: 'Alice Johnson',
    createdAt: '2024-01-17T11:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z',
    dueDate: '2024-02-01T00:00:00Z'
  },
  {
    id: 'TASK-8901',
    title: 'Update README with new installation instructions.',
    category: 'Documentation',
    status: 'Backlog',
    priority: 'Low',
    description: 'Documentation maintenance task',
    assignee: undefined,
    createdAt: '2024-01-19T13:00:00Z',
    updatedAt: '2024-01-19T13:00:00Z'
  }
]

export const mockTrafficData: TrafficDataPoint[] = [
  { day: 'Mon', clicks: 780, visitors: 520 },
  { day: 'Tue', clicks: 650, visitors: 480 },
  { day: 'Wed', clicks: 420, visitors: 280 },
  { day: 'Thu', clicks: 580, visitors: 380 },
  { day: 'Fri', clicks: 720, visitors: 450 },
  { day: 'Sat', clicks: 350, visitors: 220 },
  { day: 'Sun', clicks: 980, visitors: 650 }
]

export const mockAnalyticsOverview: AnalyticsOverview = {
  title: 'Traffic Overview',
  subtitle: 'Weekly clicks and unique visitors',
  data: mockTrafficData
}

export const mockAnalyticsMetrics: AnalyticsMetric[] = [
  {
    id: 'total-clicks',
    label: 'Total Clicks',
    value: '1,248',
    trend: {
      value: '+12.4% vs last week',
      direction: 'up',
      isPositive: true
    },
    icon: 'chart'
  },
  {
    id: 'unique-visitors',
    label: 'Unique Visitors',
    value: '832',
    trend: {
      value: '+5.8% vs last week',
      direction: 'up',
      isPositive: true
    },
    icon: 'users'
  },
  {
    id: 'bounce-rate',
    label: 'Bounce Rate',
    value: '42%',
    trend: {
      value: '-3.2% vs last week',
      direction: 'down',
      isPositive: true
    },
    icon: 'bounce'
  },
  {
    id: 'avg-session',
    label: 'Avg. Session',
    value: '3m 24s',
    trend: {
      value: '+18s vs last week',
      direction: 'up',
      isPositive: true
    },
    icon: 'clock'
  }
]

export const mockReferrersData: ReferrerData[] = [
  {
    id: 'direct',
    source: 'Direct',
    visits: 512,
    color: '#94a3b8'
  },
  {
    id: 'product-hunt',
    source: 'Product Hunt',
    visits: 238,
    color: '#64748b'
  },
  {
    id: 'twitter',
    source: 'Twitter',
    visits: 174,
    color: '#475569'
  },
  {
    id: 'blog',
    source: 'Blog',
    visits: 104,
    color: '#334155'
  }
]

export const mockReferrersMaxVisits = Math.max(...mockReferrersData.map((r) => r.visits))

export const mockDevicesData: DeviceData[] = [
  {
    id: 'desktop',
    device: 'Desktop',
    percentage: 74,
    color: '#3b82f6'
  },
  {
    id: 'mobile',
    device: 'Mobile',
    percentage: 22,
    color: '#64748b'
  },
  {
    id: 'tablet',
    device: 'Tablet',
    percentage: 4,
    color: '#94a3b8'
  }
]

export const mockTrafficDataLastMonth: TrafficDataPoint[] = [
  { day: 'Week 1', clicks: 4520, visitors: 3200 },
  { day: 'Week 2', clicks: 5180, visitors: 3650 },
  { day: 'Week 3', clicks: 4890, visitors: 3420 },
  { day: 'Week 4', clicks: 5640, visitors: 4100 }
]

export const mockTrafficDataLastYear: TrafficDataPoint[] = [
  { day: 'Jan', clicks: 18500, visitors: 12400 },
  { day: 'Feb', clicks: 21200, visitors: 14800 },
  { day: 'Mar', clicks: 24600, visitors: 17200 },
  { day: 'Apr', clicks: 22800, visitors: 15900 },
  { day: 'May', clicks: 26400, visitors: 18600 },
  { day: 'Jun', clicks: 28900, visitors: 20100 },
  { day: 'Jul', clicks: 31200, visitors: 22400 },
  { day: 'Aug', clicks: 29800, visitors: 21200 },
  { day: 'Sep', clicks: 27500, visitors: 19800 },
  { day: 'Oct', clicks: 30100, visitors: 21600 },
  { day: 'Nov', clicks: 32800, visitors: 23400 },
  { day: 'Dec', clicks: 35200, visitors: 25100 }
]

export const mockExtendedReferrersData: ReferrerData[] = [
  { id: 'direct', source: 'Direct', visits: 512, color: '#94a3b8' },
  { id: 'product-hunt', source: 'Product Hunt', visits: 238, color: '#64748b' },
  { id: 'twitter', source: 'Twitter', visits: 174, color: '#475569' },
  { id: 'blog', source: 'Blog', visits: 104, color: '#334155' },
  { id: 'google', source: 'Google', visits: 89, color: '#1e293b' },
  { id: 'linkedin', source: 'LinkedIn', visits: 67, color: '#0f172a' },
  { id: 'facebook', source: 'Facebook', visits: 45, color: '#020617' },
  { id: 'reddit', source: 'Reddit', visits: 32, color: '#64748b' }
]

export const mockAnalyticsMetricsLastWeek: AnalyticsMetric[] = [
  {
    id: 'total-clicks',
    label: 'Total Clicks',
    value: '1,110',
    trend: {
      value: '+8.2% vs previous week',
      direction: 'up',
      isPositive: true
    },
    icon: 'chart'
  },
  {
    id: 'unique-visitors',
    label: 'Unique Visitors',
    value: '786',
    trend: {
      value: '+3.1% vs previous week',
      direction: 'up',
      isPositive: true
    },
    icon: 'users'
  },
  {
    id: 'bounce-rate',
    label: 'Bounce Rate',
    value: '45.2%',
    trend: {
      value: '+1.8% vs previous week',
      direction: 'up',
      isPositive: false
    },
    icon: 'bounce'
  },
  {
    id: 'avg-session',
    label: 'Avg. Session',
    value: '3m 06s',
    trend: {
      value: '-12s vs previous week',
      direction: 'down',
      isPositive: false
    },
    icon: 'clock'
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Freeman',
    lastName: 'Dicki',
    username: 'freeman.dicki',
    name: 'Freeman Dicki',
    email: 'freeman83@gmail.com',
    phoneNumber: '+16972759140',
    status: 'Invited',
    role: 'Cashier',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    firstName: 'Nick',
    lastName: 'Bashirian-Lowe',
    username: 'nick.bashirian-lowe',
    name: 'Nick Bashirian-Lowe',
    email: 'nick_donnelly@gmail.com',
    phoneNumber: '+17425632370',
    status: 'Invited',
    role: 'Admin',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    lastLogin: '2024-01-20T14:45:00Z'
  },
  {
    id: '3',
    firstName: 'Ardith',
    lastName: 'Jast',
    username: 'ardith_jast',
    name: 'Ardith Jast',
    email: 'ardith_crist@gmail.com',
    phoneNumber: '+13553118532',
    status: 'Suspended',
    role: 'Cashier',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    lastLogin: '2024-01-15T09:30:00Z'
  },
  {
    id: '4',
    firstName: 'Jeffrey',
    lastName: 'Collins',
    username: 'jeffrey_collins81',
    name: 'Jeffrey Collins',
    email: 'jeffrey.stark98@hotmail.com',
    phoneNumber: '+14646410541',
    status: 'Inactive',
    role: 'Manager',
    createdAt: '2023-12-20T10:45:00Z',
    updatedAt: '2024-01-10T12:00:00Z',
    lastLogin: '2024-01-05T14:15:00Z'
  },
  {
    id: '5',
    firstName: 'Ashton',
    lastName: 'Auer',
    username: 'ashton_auer',
    name: 'Ashton Auer',
    email: 'ashton_hegmann67@yahoo.com',
    phoneNumber: '+14345495030',
    status: 'Suspended',
    role: 'Superadmin',
    createdAt: '2023-11-15T08:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z',
    lastLogin: '2023-12-28T11:45:00Z'
  },
  {
    id: '6',
    firstName: 'Golda',
    lastName: 'Gleason',
    username: 'golda.gleason',
    name: 'Golda Gleason',
    email: 'golda.smith32@gmail.com',
    phoneNumber: '+14606427316',
    status: 'Active',
    role: 'Manager',
    createdAt: '2023-10-10T13:20:00Z',
    updatedAt: '2024-01-22T09:10:00Z',
    lastLogin: '2024-01-22T09:10:00Z'
  },
  {
    id: '7',
    firstName: 'Maurine',
    lastName: 'Rutherford',
    username: 'maurine.rutherford',
    name: 'Maurine Rutherford',
    email: 'maurine_bechtelar@gmail.com',
    phoneNumber: '+16544865144',
    status: 'Suspended',
    role: 'Manager',
    createdAt: '2023-09-05T14:30:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
    lastLogin: '2023-12-20T08:20:00Z'
  },
  {
    id: '8',
    firstName: 'Alford',
    lastName: 'Wehner',
    username: 'alford.wehner',
    name: 'Alford Wehner',
    email: 'alford36@hotmail.com',
    phoneNumber: '+12134843128',
    status: 'Active',
    role: 'Manager',
    createdAt: '2023-08-15T07:45:00Z',
    updatedAt: '2024-01-21T11:25:00Z',
    lastLogin: '2024-01-21T11:25:00Z'
  },
  {
    id: '9',
    firstName: 'Theresa',
    lastName: 'Rolfson',
    username: 'theresa_rolfson46',
    name: 'Theresa Rolfson',
    email: 'theresa.mertz@yahoo.com',
    phoneNumber: '+17353031624',
    status: 'Suspended',
    role: 'Cashier',
    createdAt: '2023-07-20T12:15:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
    lastLogin: '2023-11-30T14:50:00Z'
  },
  {
    id: '10',
    firstName: 'Buford',
    lastName: 'Bradtke',
    username: 'buford.bradtke',
    name: 'Buford Bradtke',
    email: 'buford68@yahoo.com',
    phoneNumber: '+16715125120',
    status: 'Suspended',
    role: 'Cashier',
    createdAt: '2023-06-10T09:00:00Z',
    updatedAt: '2024-01-16T13:15:00Z',
    lastLogin: '2023-10-15T16:25:00Z'
  },
  {
    id: '11',
    firstName: 'Emily',
    lastName: 'Anderson',
    username: 'emily.anderson',
    name: 'Emily Anderson',
    email: 'emily.anderson@company.com',
    phoneNumber: '+15551234567',
    status: 'Active',
    role: 'Admin',
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
    lastLogin: '2024-01-22T14:00:00Z',
    avatar: '/avatars/emily.jpg'
  },
  {
    id: '12',
    firstName: 'Michael',
    lastName: 'Taylor',
    username: 'michael.taylor',
    name: 'Michael Taylor',
    email: 'michael.taylor@company.com',
    phoneNumber: '+15557654321',
    status: 'Active',
    role: 'Superadmin',
    createdAt: '2023-05-15T08:30:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
    lastLogin: '2024-01-20T16:00:00Z',
    avatar: '/avatars/michael.jpg'
  },
  {
    id: '13',
    firstName: 'Sarah',
    lastName: 'Martinez',
    username: 'sarah.martinez',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@company.com',
    phoneNumber: '+15559876543',
    status: 'Inactive',
    role: 'Cashier',
    createdAt: '2023-11-20T11:45:00Z',
    updatedAt: '2024-01-05T09:30:00Z',
    lastLogin: '2023-12-25T10:15:00Z'
  },
  {
    id: '14',
    firstName: 'David',
    lastName: 'Chen',
    username: 'david.chen',
    name: 'David Chen',
    email: 'david.chen@company.com',
    phoneNumber: '+15552345678',
    status: 'Active',
    role: 'Manager',
    createdAt: '2023-09-10T13:00:00Z',
    updatedAt: '2024-01-21T15:45:00Z',
    lastLogin: '2024-01-21T15:45:00Z',
    avatar: '/avatars/david.jpg'
  },
  {
    id: '15',
    firstName: 'Lisa',
    lastName: 'Wilson',
    username: 'lisa.wilson',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@company.com',
    phoneNumber: '+15558765432',
    status: 'Invited',
    role: 'Cashier',
    createdAt: '2024-01-18T10:20:00Z',
    updatedAt: '2024-01-18T10:20:00Z'
  }
]
