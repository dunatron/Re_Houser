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
          'contact us at admin@rehouser.co.nz',
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
        fieldProps: {
          variant: 'ol',
          type: 'A',
          start: 'F',
          // reversed: 'reversed',
        },
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
        fieldProps: {
          variant: 'ol',
        },
        layoutProps: {
          variant: 'left',
        },
        inners: [
          {
            type: 'Text',
            value: '3. Information We Collect When You Use Our Services.',
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
        fieldProps: {
          variant: 'ul',
        },
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
      wrap: true,
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
          'We may share the information we collect in various ways, including the following:',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'List',
        fieldProps: {
          variant: 'ol',
        },
        layoutProps: {
          variant: 'left',
        },
        inners: [
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '1.',
            title: 'Vendors and Service Providers.',
            value:
              'We may share information with third-party vendors and service providers that provide services on our behalf., such as ' +
              'Sharing property information on advertising platforms and associating your name with our third party payment processing vendor',
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
            listNum: '2.',
            title: 'Analytics.',
            value:
              'We use analytics providers such as Google Analytics. Google Analytics uses cookies to collect non-identifying information. Google provides some additional privacy options regarding its Analytics cookies at http://www.google.com/policies/privacy/partners/',
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
            listNum: '3.',
            title: 'As Required By Law and Similar Disclosures.',
            value:
              'We may also share information to (i) satisfy any applicable law, regulation, legal process, or governmental request; (ii) enforce this Privacy Policy and our Terms of Service, including investigation of potential violations hereof; (iii) detect, prevent, or otherwise address fraud, security, or technical issues; (iv) respond to your requests; or (v) protect our rights, property or safety, our users and the public. This includes exchanging information with other companies and organizations for fraud protection and spam/malware prevention.',
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
            listNum: '4.',
            title: 'With Your Consent.',
            value: 'We may share information with your consent.',
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
        value: '4. Legal Basis for Processing Personal Information',
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
          'Our legal basis for collecting and using the personal information described above will depend on the personal information concerned and the specific context in which we collect it.',
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
          'However, we will normally collect personal information from you only (i) where we need the personal information to perform a contract with you; (ii) where the processing is in our legitimate interests and not overridden by your rights; or (iii) where we have your consent to do so.  We have a legitimate interest in operating our Services and communicating with you as necessary to provide these Services',
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
          'In some cases, we may also have a legal obligation to collect personal information from you or may otherwise need the personal information to protect your vital interests or those of another person.',
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
          'If we ask you to provide personal information to comply with a legal requirement or to perform a contract with you, we will make this clear at the relevant time and advise you whether the provision of your personal information is mandatory or not (as well as of the possible consequences if you do not provide your personal information).',
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
        value: '5. Security',
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
          'Rehouser is committed to protecting your information. To do so, we employ a variety of security technologies and measures designed to protect information from unauthorized access, use, or disclosure. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information. However, please bear in mind that the Internet cannot be guaranteed to be 100% secure.',
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
        value: '6. Data Retention',
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
          'We retain personal information we collect from you where we have an ongoing legitimate business need to do so (for example, to provide you with a service you have requested such as creating rental appraisals or using properties where your name will be associated with it).',
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
        value: '7. Access',
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
          'If you are a registered user, you may access certain information associated with your Account by logging into our Services. If you terminate your Account, any public activity on your Account prior to deletion may remain stored on our servers and may remain accessible to the public.',
        fieldProps: {
          variant: 'body1',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Text',
        value: `To protect your privacy and security, we may also take reasonable steps to verify your identity before updating or removing your information. The information you provide us may be archived or stored periodically by us according to backup processes conducted in the ordinary course of business for disaster recovery purposes. Your ability to access and correct your information may be temporarily limited where access and correction could: inhibit Rehouser's ability to comply with a legal obligation; inhibit Rehouser's ability to investigate, make or defend legal claims; result in disclosure of personal information about a third party; or result in breach of a contract or disclosure of trade secrets or other proprietary business information belonging to Rehouser or a third party.`,
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
        value: '8. Changes to this Privacy Policy',
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
          'This Privacy Policy may be modified from time to time, so please review it frequently. Changes to this Privacy Policy will be posted on our websites. If we materially change the ways in which we use or share personal information previously collected from you through our Services, we will notify you through our Services, by email, or other communication.',
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
        value: 'Additional Disclosures',
        fieldProps: {
          variant: 'h2',
        },
        layoutProps: {
          variant: 'left',
        },
      },
      {
        type: 'Link',
        value: 'Terms of Engagement',
        href: '/legal/terms-of-engagement',
        target: '_blank',
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
