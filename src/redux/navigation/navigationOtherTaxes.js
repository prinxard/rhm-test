import { RhmDashboard, Collections } from '../../components/Icons/index';


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
            url: '/reports',
            title: 'View',
            items: [],
          },
        ],
      },

    ],
  },
];

export default function navigationOtherTaxes(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
