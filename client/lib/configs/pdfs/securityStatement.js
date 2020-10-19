import moment from 'moment';

const config = [
  {
    type: 'Section',
    value: '',
    fieldProps: {},
    layoutProps: {
      variant: 'column',
      wrap: true,
    },
    inners: [
      {
        type: 'Text',
        value: 'Privacy Policy',
        fieldProps: {
          variant: 'h1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value: `At date: ${moment().format('llll')}`,
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value:
          'This Privacy Policy describes how Rehouser and its affiliates ("Rehouser,", "we, "our", or "us") collect, use and share information ' +
          'in connection with your use of our websites (including app.rehouser.co.nz), services, and applications.',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value:
          'We may collect and recieve information about users of our Services ("users," "you," "landlord," "tenant," "lessor," "lessee," or "me") from various ' +
          'sources, including: information you provide through your user account, properties you create, or information you supply to rental applications or leases',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value:
          'We recommend that you read this Privacy Policy in full, including the Additional Disclosures referenced at the bottom of this document, to ensure you are fully informed. If you have any questions about this Privacy Policy or Rehousers data collection, use, and disclosure practises, please ' +
          'contact us at privacy@rehouser.co.nz',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
    ],
  },
  {
    type: 'Section',
    value: '',
    fieldProps: {},
    layoutProps: {
      variant: 'column',
      wrap: true,
    },
    inners: [
      {
        type: 'Text',
        value: '1. Information We Collect',
        fieldProps: {
          variant: 'h2',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'List',
        fieldProps: {},
        layoutProps: {
          variant: 'left',
        },
        inners: [
          {
            type: 'Text',
            value: '1. Information You Provide',
            fieldProps: {
              variant: 'h3',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '1A.',
            title: 'Account Registration.',
            value:
              'When you register for an account, we may ask for your contact information, including items such as name, email, phone',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '1B.',
            title: 'Personal Information.',
            value:
              'We may ask for additional information that will be required to progress to the next stage. This will include things such as your current address, proof of address, and photo identification',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '1C.',
            title: 'Payment Information.',
            value:
              'When you add your financial account information to your account, that information is directed yo our third-party payment processor. we do not store your financial account information on our systems; however ' +
              'we have access to, and may retain, subscriber information through our third party payment processor. Also as a landolord we will ask you for a bank account number to make payouts into',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
        ],
      },
      {
        type: 'List',
        fieldProps: {},
        layoutProps: {
          variant: 'left',
        },
        inners: [
          {
            type: 'Text',
            value: '2. Information We Collect When You Use Our Services.',
            fieldProps: {
              variant: 'h3',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '2A.',
            title: 'Cookies and Other Tracking Technologies.',
            value:
              'As is true with most websites, we gather certain information automatically and store it in log files. ' +
              'In addition, when you use our Services, we may collect, cerytain information automatically from your device. This information may include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, date/time stamp clickstream data, landing page, and referring URL. ' +
              'To collect this information, a cookie may be set on your computer or device when you visit our Services. Cookies contain a small amount of information that allows our web services to recognize you. The information we collect through cookies is used to confirm you are who you say you are, and to store some information such as device information in log files to send you automatic updates when you are concerned about certain data changes. ' +
              'We may also automatically collect information about your use of features of our services, frequenxy of visits, and other information related to your interactions with the services.',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'Section',
    value: '',
    fieldProps: {},
    layoutProps: {
      variant: 'column',
      wrap: true,
    },
    inners: [
      {
        type: 'Text',
        value: '2. How We Use Information',
        fieldProps: {
          variant: 'h2',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value:
          'We use the information we collect in various ways, including to:',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'List',
        fieldProps: {},
        layoutProps: {
          variant: 'left',
        },
        inners: [
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Privide, operate, and maintain our Services;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Improve, personalize, and expand our Services;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Understand and analyze how you use our Services;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value:
              'Develop new products, services, features, and functionality;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value:
              'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Process your transactions;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Send you emails and push notifications;',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value: 'Find and prevent fraud; and',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
          {
            type: 'Li',
            listStyle: 'bullet',
            value:
              'For compliance purposes, including enforcing our Terms of Engagment, Terms of Service, or other legal rights, or as may be required by applicable laws and regulations or requested by any judicial process or governmental agency',
            fieldProps: {
              variant: 'body1',
            },
            layoutProps: {
              variant: 'left',
            },
          },
        ],
      },
    ],
  },

  {
    type: 'Section',
    value: '',
    fieldProps: {},
    layoutProps: {
      variant: 'column',
      wrap: false,
    },
    inners: [
      {
        type: 'Text',
        value: '2. How We Share Information',
        fieldProps: {
          variant: 'h2',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value:
          'Vendors and Service Providers. We may share information with third-party vendors and service providers that provide services on our behalf., such as ' +
          'Sharing property information on advertising platforms and associating your name with our third party payment processing vendor',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
    ],
  },
];

export default config;
