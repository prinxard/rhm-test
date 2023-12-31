import { RhmDashboard, Collections, Settings } from '../../components/Icons/index';

const initialState = [
  {
    title: 'Applications',
    items: [
      {
        url: '/dashboard',
        icon: <RhmDashboard />,
        title: 'Dashboard',
        items: [],
      },

      {
        url: '/',
        icon: <Collections />,
        title: 'Collections',
        items: [
          {
            title: 'View',
            url: '/reports',
            items: [],
          },
          {
            title: 'Manifest',
            url: '/reports-manifest',
            items: [],
          },
        ],
      },

      {
        url: '/',
        icon: <Settings />,
        title: 'Settings',
        items: [
          {
            title: 'Audit Receipt',
            items: [
              { title: 'Generate', url: '/view/tax-audit', items: [] },
            ],
          },
        ],
      },

    ],
  },
];

export default function navigationAuditPrint(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
