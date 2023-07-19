import { RhmDashboard, ManageTaxpayer, ManageUser, DirectAssessment, Paye, Collections, Settings } from '../../components/Icons/index';

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
        icon: <ManageTaxpayer />,
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
              { title: 'Create', url: '/taxpayer', items: [] },
              {
                title: 'View',
                url: '/reports-individual',
                items: [],
              },
            ],
          },
          {
            title: 'Non-Individual',
            items: [
              { title: 'Create', url: '/taxpayer/non-individual', items: [] },
              {
                title: 'View',
                url: '/reports-non-individual',
                items: [],
              },
            ],
          },
        ],
      },

      // {
      //   url: '/',
      //   icon: <ManageUser />,
      //   title: 'Manage User',
      //   items: [
      //     {
      //       title: 'Dashboard',
      //       url: '/',
      //       items: [],
      //     },
      //     {
      //       title: 'User',
      //       items: [
      //         { title: 'Create', url: '/register', items: [] },
      //         {
      //           title: 'View',
      //           url: '/view/users',
      //           items: [],
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        url: '/',
        icon: <DirectAssessment />,
        title: 'Direct Assessment',
        items: [
          // {
          //   title: 'Create',
          //   url: '/direct-asses',
          //   items: [],
          // },
          // {
          //   title: 'Draft Assessments',
          //   url: '/view/pendingdirect',
          //   items: [],
          // },
          {
            title: 'Submitted Assessments',
            url: '/view/completeddirect',
            items: [],
          },
          {
            title: 'Verified BOJ',
            url: '/view/listverifiedboj',
            items: [],
          },
          {
            title: 'Approved Assessments',
            url: '/view/approvedasses',
            items: [],
          },
          {
            url: '/',
            title: 'Report',
            items: [
              {
                title: 'Assessment',
                url: '/assessment-report',
                items: [],
              },
              {
                title: 'Unassessed Collections',
                url: '/unassessed-report',
                items: [],
              },
            ],
          },
          {
            url: '/',
            title: 'Objection',
            items: [
              {
                title: 'Draft',
                url: '/view/objection/draft',
                items: [],
              },
              {
                title: 'Submitted',
                url: '/view/objection/submitted',
                items: [],
              },
              {
                title: 'Verified',
                url: '/view/objection/verified',
                items: [],
              },
              // {
              //   title: 'Pending EC sign',
              //   url: '/view/objection/approved',
              //   items: [],
              // },
              {
                title: 'Print',
                url: '/view/objection/vetted',
                items: [],
              },
            ],
          },
          {
            url: '/',
            title: 'Tax Clearance (TCC)',
            items: [
              // {
              //   url: '/tcc',
              //   title: 'Create',
              //   items: [],
              // },
              {
                url: '/view/listtcc',
                title: 'View',
                items: [],
              },
              {
                url: '/view/listprinttcc',
                title: 'Print',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <Paye />,
        title: 'PAYE',
        items: [
          {
            url: '/',
            title: 'TCC',
            items: [
              {
                title: 'Create',
                url: '/tcc/paye',
                items: [],
              },
              {
                title: 'Draft',
                url: '/view/listpayetcc/alltcc',
                items: [],
              },
              {
                title: 'Verified',
                url: '/view/listpayetcc/alltcc/verified',
                items: [],
              },
              {
                title: 'Audit Checked',
                url: '/view/listpayetcc/alltcc/audit',
                items: [],
              },
              {
                title: 'Pending E.C Sign',
                url: '/view/listpayetcc/alltcc/approved',
                items: [],
              },
              {
                title: 'Print',
                url: '/view/listpayetcc',
                items: [],
              },
              // {
              //   title: 'Unassessed Collections',
              //   url: '/unassessed-report',
              //   items: [],
              // },
            ],
          },
          {
            url: '/',
            title: 'Income Details',
            items: [
              {
                title: 'Create',
                url: '/pita/payslip',
                items: [],
              },
              {
                title: 'view',
                url: '/view/payslip',
                items: [],
              },

            ],
          },
          {
            url: '/',
            title: 'Annual Filing',
            items: [
              {
                title: 'Review Documents',
                url: '/paye-annual',
                items: [],
              },
            ],
          },
          // {
          //   url: '/',
          //   title: 'Dashboard',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Annual Returns',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Remittance Schedules',
          //   items: [],
          // },
          // {
          //   url: '/reports',
          //   title: 'Reports',
          //   items: [],
          // },
        ],
      },

      {
        url: '/',
        icon: <Collections />,
        title: 'Collections',
        items: [
          // {
          //   url: '/',
          //   title: 'Dashboard',
          //   items: [],
          // },
          {
            url: '/reports',
            title: 'View',
            items: [],
          },
          // {
          //   url: '/',
          //   title: 'Reconcilliations',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Generate Receipt',
          //   items: [
          //     {
          //       url: '/',
          //       title: 'Create',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'View',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Verify',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Approve',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Recon Report',
          //       items: [],
          //     },
          //   ],
          // },
        ],
      },

      // {
      //   url: '/',
      //   icon: <Settings />,
      //   title: 'Settings',
      //   items: [
      //     {
      //       title: 'Revenue Items',
      //       items: [
      //         { title: 'Create', url: '/', items: [] },
      //         {
      //           title: 'View',
      //           url: '/',
      //           items: [],
      //         },
      //         {
      //           title: 'Edit',
      //           url: '/',
      //           items: [],
      //         },
      //         {
      //           title: 'Delete',
      //           url: '/',
      //           items: [],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Tax Office',
      //       items: [
      //         { title: 'Create', url: '/', items: [] },
      //         {
      //           title: 'View',
      //           url: '/',
      //           items: [],
      //         },
      //         { title: 'Edit', url: '/', items: [] },
      //         { title: 'Delete', url: '/', items: [] },

      //       ],
      //     },
      //     {
      //       title: 'Sectors',
      //       items: [
      //         { title: 'Create', url: '/', items: [] },
      //         { title: 'View', url: '/', items: [] },
      //         {
      //           title: 'Edit',
      //           url: '/',
      //           items: [],
      //         },
      //         {
      //           title: 'Delete',
      //           url: '/',
      //           items: [],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Budget Estimate',
      //       items: [
      //         { title: 'Create', url: '/', items: [] },
      //         { title: 'View', url: '/', items: [] },
      //         {
      //           title: 'Edit',
      //           url: '/',
      //           items: [],
      //         },
      //         {
      //           title: 'Delete',
      //           url: '/',
      //           items: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];

export default function navigationApprover(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
