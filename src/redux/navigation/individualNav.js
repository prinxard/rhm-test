import { Dashboard, Invoice, UserGuide, FileReturns } from '../../components/Icons/index';

// Added non individual navigation to side menu

const initialState = [
  {
    title: 'Applications',
    items: [

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Manage Taxpayer',
        items: [
          // {
          //   title: 'Dashboard',
          //   url: '/',
          //   items: [],
          // },
          {
            title: 'Individual',
            items: [
              // { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/view/individual',
                items: [],
              },
            ],
          },
          {
            title: 'Non-Individual',
            items: [
              // { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/view/nonindividual',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Manage User',
        items: [
          // {
          //   title: 'Dashboard',
          //   url: '/',
          //   items: [],
          // },
          {
            title: 'User',
            items: [
              // { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Direct Assessment',
        items: [
          {
            title: 'Create',
            url: '/direct-asses',
            items: [],
          },
          {
            title: 'Draft Assessments',
            url: '/view/pendingdirect',
            items: [],
          },
          {
            title: 'Submitted Assessments',
            url: '/view/completeddirect',
            items: [],
          },
          {
            title: 'Approved Assessments',
            url: '/view/approvedasses',
            items: [],
          },
        ],
      },
      {
        url: '/dashboard',
        icon: <Dashboard />,
        title: 'Dashboard',
        items: [],
      },

      {
        url: '/',
        icon: <Invoice />,
        title: 'PAYE',
        items: [
          {
            url: '/',
            title: 'Dashboard',
            items: [],
          },
          {
            url: '/',
            title: 'Annual Returns',
            items: [],
          },
          {
            url: '/',
            title: 'Remittance Schedules',
            items: [],
          },
          {
            url: '/',
            title: 'Tax Clearance (TCC)',
            items: [
              {
                url: '/',
                title: 'Create',
                items: [],
              },
              {
                url: '/',
                title: 'View',
                items: [],
              },
            ],
          },
          {
            url: '/',
            title: 'Reports',
            items: [],
          },
        ],
      },

      {
        url: '/',
        icon: <Invoice />,
        title: 'Collections',
        items: [
          {
            url: '/',
            title: 'Dashboard',
            items: [],
          },
          {
            url: '/',
            title: 'View',
            items: [],
          },
          {
            url: '/',
            title: 'Reconcilliations',
            items: [],
          },
          {
            url: '/',
            title: 'Generate Receipt',
            items: [
              {
                url: '/',
                title: 'Create',
                items: [],
              },
              {
                url: '/',
                title: 'View',
                items: [],
              },
              {
                url: '/',
                title: 'Verify',
                items: [],
              },
              {
                url: '/',
                title: 'Approve',
                items: [],
              },
              {
                url: '/',
                title: 'Recon Report',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Settings',
        items: [
          {
            title: 'Revenue Items',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },
          {
            title: 'Tax Office',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
              { title: 'Edit', url: '/', items: [] },
              { title: 'Delete', url: '/', items: [] },

            ],
          },
          {
            title: 'Sectors',
            items: [
              { title: 'Create', url: '/', items: [] },
              { title: 'View', url: '/', items: [] },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },
          {
            title: 'Budget Estimate',
            items: [
              { title: 'Create', url: '/', items: [] },
              { title: 'View', url: '/', items: [] },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function individualNavigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
