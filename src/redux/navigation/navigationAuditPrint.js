import { RhmDashboard, Collections, Settings } from '../../components/Icons/index';

// Added non individual navigation to side menu

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
        url: '/view/tax-audit',
        icon: <Settings />,
        title: 'Audit Receipt',
        items: [],
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
