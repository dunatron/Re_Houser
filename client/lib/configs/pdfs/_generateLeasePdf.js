import _bondAmount from '../../_bondAmount';
import _usersAge from '../../_usersAge';
import { formatCentsToDollarsVal } from '../../formatCentsToDollars';
import moment from 'moment';
import prettyEnumVal from '../../prettyEnumVal';

const genLesseeDetails = lessee => {
  const user = lessee.user;
  console.log('GEN DOB FROM USER : ', user);
  return [
    {
      type: 'Text',
      value: 'Tenant Details',
      fieldProps: { variant: 'h4' },
      layoutProps: { variant: 'left' },
    },
    {
      type: 'Text',
      value: `Names: ${user?.firstName}`,
      fieldProps: { variant: 'body1' },
      layoutProps: { variant: 'left' },
    },
    {
      type: 'Text',
      value: `ID Type: ToDo: implement on user model`,
      fieldProps: { variant: 'body1' },
      layoutProps: { variant: 'left' },
    },
    {
      type: 'Text',
      value: `Email: ${user?.email}`,
      fieldProps: { variant: 'body1' },
      layoutProps: { variant: 'left' },
    },
    {
      type: 'Text',
      value: `Phone: ${user?.phone}`,
      fieldProps: { variant: 'body1' },
      layoutProps: { variant: 'left' },
    },
    {
      type: 'Text',
      value: `Tenant under the age of 18? ${_usersAge(user?.dob)}`,
      fieldProps: { variant: 'body1' },
      layoutProps: { variant: 'left' },
    },
  ];
};

const _generateLeasePdfConf = lease => {
  // map the owners
  // lessors
  // lessees
  // property
  // rent
  // type and all of it
  console.log('THE LEASE AND ITS DATA: ', lease);
  const lessors = lease.lessors;
  const lessees = lease.lessees;
  // const lessorDetails = lessors.map((lessor, idx) => {
  //   return [];
  //   return [
  //     {
  //       type: 'Text',
  //       value: 'Tenant Details:',
  //       fieldProps: { variant: 'h4' },
  //       layoutProps: { variant: 'left' },
  //     },
  //   ];
  // });
  // const lessorDetails = genLessorDetails(lessors);

  const rentDollarAmount = formatCentsToDollarsVal(lease.rent);
  const bondDollarAmount = formatCentsToDollarsVal(
    _bondAmount(lease.bondType, lease.rent)
  );
  const tenancyStartFormatted = moment(lease.moveInDate).format(
    'dddd, MMMM Do YYYY, h:mm:ss a'
  );

  const isFixedTerm = lease.tenancyType === 'FIXED' ? true : false;
  const isPeriodicTerm = lease.tenancyType === 'PERIODIC' ? true : false;

  const expiryDateFormatted = moment(lease.expiryDate).format(
    'dddd, MMMM Do YYYY'
  );

  return [
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
          value: 'Tenancy Agreement – Tenant Contract – Terms and Conditions.',
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
            'Online authentication has occurred to confirm the parties are who they say they are. The parties consent to this agreement being in electronic form, being signed by either of them electronically and acknowledge that an electronic signature to this agreement is binding and valid.',
          fieldProps: {
            variant: 'body2',
            gutterBottom: true,
          },
          layoutProps: {
            variant: 'left',
          },
        },
        {
          type: 'Text',
          value:
            'This Agreement is subject to Provisions of the Residential Tenancies Act 1986, and by any subsequent amendments.',
          fieldProps: {
            variant: 'body2',
          },
          layoutProps: {
            variant: 'left',
          },
        },
      ],
    },
    // LANDLORD RESPONSIBILITES SECTION
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
          value: '1. Landlord’s responsibilities',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              // title: 'Rent Payments.',
              value:
                'Provide and maintain the premises in a reasonable condition.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              // title: 'Assess Rent.',
              value: 'Allow the tenant quiet enjoyment of the premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              // title: 'Assess Rent.',
              value:
                'Comply with all building, health and safety standards that apply to the premises, ensuring smoke alarms are installed and functioning at the commencement of the tenancy.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              // title: 'Assess Rent.',
              value:
                'Comply with all requirements in respect of smoke alarms imposed on the Landlord by regulations.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'e.',
              // title: 'Assess Rent.',
              value:
                'Landlords need to have working smoke alarms installed in all their residential rental homes. Any replacement alarms installed after 1 July 2016 (other than hard-wired systems) need to have long life batteries and a photoelectric sensor.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'f.',
              value: 'Pay rates and any insurance taken out by the landlord. ',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'g.',
              value: 'Not seize the tenant’s goods for any reason.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'h.',
              value:
                'Inform the tenant if the property is on the market for sale.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'i.',
              value:
                'Not interfere with the supply of any services to the premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'j.',
              value:
                'Inform the tenant of any changes to the information in the insurance statement within a reasonable time.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'k.',
              value:
                'Landlord must notify promptly if there is any variation to the body corporate rules affecting the premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'l.',
              value:
                'If the Landlord is in breach of any of these responsibilities the Tenant can apply to the Tenancy Tribunal.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // TENANTS RESPONSIBILITES SECTION
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
          value: '2. Tenant’s responsibilities',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Pay the rent as and when it is due under the Tenancy agreement, in advance.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'Keep the premises well ventilated, reasonably clean and tidy, and notify the Property Manager as soon as any repairs are needed. You may not withhold rent if you cannot get repairs done.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value: 'Use the premises principally for residential purposes.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              value:
                'Pay all electricity, gas, telephone, and metered water charges if supplier charges based on consumption.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'e.',
              value:
                'Not sublet or assign or part with possession of the premises or chattels.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'f.',
              value:
                'Not cause or permit interference with, or render inoperative any means of fire escape as described within the building Act 2004.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'g.',
              value:
                'Replace batteries in smoke alarms as required and are attached to the ceilings and are working at all times.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'h.',
              value:
                'Not damage or permit damage to the premises, and to inform the Property Manager of any damage.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'i.',
              value:
                'Not disturb the neighbours or the Landlord’s other tenants. ',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'j.',
              value:
                'Not alter the premises without the Landlord’s written consent.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'k.',
              value: 'Not use the property for any unlawful purpose.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'l.',
              value:
                'Leave the property clean and tidy, and clear of rubbish and possessions at the end of the tenancy.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'm.',
              value:
                'At the end of the tenancy, leave all keys and such things with the Property Manager. Leave all chattels supplied with the tenancy.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'n.',
              value:
                'Not exceed maximum number of occupants as stated in the tenancy agreement, not exceed that number.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'o.',
              value: 'Abide by body corporate rules if a unit title premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'p.',
              value: 'To provide a forwarding address on Vacating.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'q.',
              value:
                'If the tenant abandons the premises prior to the end of any fixed term, the tenant will be liable to pay the Property Managers reasonable costs for re-letting the property.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // ROLE OF THE PROPERTY MANAGER SECTION
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
          value: '3. Role of the Property Manager',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant acknowledges that the Landlord has assigned the Property Manager to be the Landlords agent currently and they will receive all communication intended for the Landlord.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'The Tenant also understands that the Property Manager is only acting for and on behalf of the Landlord and the Property Manager has no direct or personal liability to the Tenant under this agreement..',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'To ensure certainty, no agreement between the Landlord and the Tenant in respect of any matter will be effective unless the Property Manager has provided consent.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              value:
                'This clause is no longer applicable if at any time the Property Manager is no longer acting  as an agent for the Landlord.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // BOND SECTION
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
          value: '4. Bond',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value: 'A bond of up to 4 weeks’ rent can be required.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'Bonds must be lodged with the Ministry of Business, Innovation and Employment within 23 working days of being paid.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'If the property is sold, the Landlord’s rights with regard to the bond pass to the purchaser of the property.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              value:
                'The bond covers any damage or loss to the Landlord if the Tenant’s obligations are not met, but does not cover fair wear and tear.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // RENT SECTION
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
          value: '5. Rent',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Landlords shall not require rent to be paid more than 2 weeks in advance, nor until rent already paid has been used up.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                '60 days’ written notice must be given for rent increases.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'Rent shall not be increased within 180 days of the start of the tenancy or the last rent increase.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              value:
                'Also for rent to be increased in a fixed-term tenancy, it must be stated in the tenancy agreement.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // RENT SECTION
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
          value: '5. Rights of Entry',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: 'The Landlord shall enter the premises only:',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ul', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'bullet',
              value: 'with the tenant’s consent at the time of entry',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value: 'in an emergency',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'for necessary maintenance or repairs, compliance or preparation for compliance with any requirements regarding smoke alarms, insulation and healthy homes standards, from 8 am to 7 pm, after 24 hours’ notice',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'for an inspection of the property or work done by the tenant, from 8 am to 7 pm after 48 hours’ notice',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'with the tenant’s prior consent, to show the premises to prospective tenants, purchasers, registered valuer or real estate agent doing an appraisal, or other expert engaged in appraising the premises',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'consent may not be unreasonably withheld but reasonable conditions may be imposed',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // COMPLIANCE & HEALTH & SAFETY SECTION
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
          value: '7. Compliance and Health and Safety',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant is required to immediately advise the Property Manager of any matter affecting the premises that arises that could have an impact on the health and safety or wellbeing of anyone. The Tenant understands this is an essential part of the agreement. This includes smoke alarms batteries not operational or smoke alarms becoming defective.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'No Tenant shall do nothing that creates a hazard / health and safety risk: such as (not restricted to) obstructing and means of escape from the premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // NOTICE SECTION
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
          value: '8. Notice',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'A party can give notice to any other party as specified in this agreement and in accordance with the Residential Tenancies Act 1986.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'A Party may update or amend communication by notice in writing to other parties.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'Notice given to the tenant may be sent by text message service, messenger service on Rehouser Platform or email.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // MITIGATION OF DAMAGE OR LOSS SECTION
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
          value: '9. Mitigation of Damage or Loss',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'If one party to the tenancy agreement breaches it or of this Act, the other party must take all reasonable steps to limit the damage or loss arising from the breach.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // INSURANCE SECTION
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
          value: '10. Insurance',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Landlords must disclose whether or not the property is insured in a statement as part of any new tenancy agreement, and if so, the excess amount of any relevant policies. They must also include a statement informing the tenant that a copy of their insurance policy is available on request.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'The property Owner is responsible for insuring the dwelling and Chattels. The tenant is responsible for insuring their possession. It is recommended the Tenant gets independent advice on Tenant liability insurance to cover potential damage to the property owners property included in the tenancy, which the Tenant may be liable for.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'Landlords must provide tenants with this insurance information and provide updated information within a reasonable timeframe if insurance information changes, or (where they are not the insurance holder) within a reasonable timeframe of becoming aware of the changes.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'd.',
              value:
                'If tenants or their guests damage a rental property as a result of careless behaviour, the tenant is liable for the cost of the damage up to four weeks’ rent or the insurance excess (if applicable), whichever is lower. Tenants on income-related rents are liable for the cost of the damage up to four weeks’ market rent or the insurance excess (if applicable), whichever is lower.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'e.',
              value:
                'Tenants will be liable for the full cost of damage that they or their guests cause intentionally or that results from an act or omission that constitutes an imprisonable offence.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // HEALTH HOMES SECTION
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
          value: '12. Health Homes Standard',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value:
            'Landlords must include a statement in the tenancy agreement, which confirms:',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ul', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'that on and after the commencement of the tenancy, the landlord will comply with the healthy homes standards as required by section 45(1)(bb) of the Residential Tenancies Act, or',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'bullet',
              value:
                'that the landlord already complies with the healthy homes standards as required by section 45(1)(bb) of the Residential Tenancies Act This statement can be combined with the insulation statement, with one signature.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // INSULATION SECTION
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
          value: '13. Insulation',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Landlords must disclose the extent of insulation in their properties in a signed statement as part of any new tenancy agreement.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'Landlords must provide ceiling and underfloor insulation that meets minimum standards unless they meet an exception. In the case of an exception, the landlord must explain how it applies. ',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'c.',
              value:
                'Landlords must make all reasonable efforts to obtain the required information. This includes physically looking, engaging a professional to do an assessment and/or checking the council building file.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // LOCKS / ALARMS SECTION
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
          value: '14. Locks / Alarms',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Locks can only be changed with the agreement of both the Tenant and the Landlord. They should be provided and maintained in a secure state by the landlord. If the tenant changes the locks then they must immediately supply new spare keys to the landlord. If there is an alarm at the property the tenant can change the code at their expense and the new code must be provided to the Landlord. This is to ensure that the Landlord can gain access to the property in emergency situations. All keys/security devices must be returned at the end of the tenancy by no later than midday on the first working day following the last day of the tenancy.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // RUBBISH SECTION
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
          value: '15. Rubbish',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant shall keep the interior and exterior of the premises clean, tidy and free from rubbish, bottles, cigarette butts or similar at all times. Rubbish/recycling shall be dealt with in accordance with Council policy and keep the property free from pests and vermin. Tenants will be liable for pest removal cost. Tenants also will need to clean and leave council bins at the property for the next occupant.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // VEHICLES SECTION
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
          value: '16. Vehicles',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Vehicles are not to be parked on lawns or gardens and nowhere that blocks access of other residents. Tenants agree to keep driveways free of oil drippings and agree to supply a dripping tray if necessary.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'b.',
              value:
                'The Tenant agrees to not dismantle any vehicles within the premises, or the street. No unregistered or unwarranted vehicles on the property at any time.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // TELEVISION SECTION
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
          value: '17. Television ',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant acknowledges the premises may not include the appropriate apparatus to watch digital television. If the tenant wishes to install one at the tenants cost this will be with written approval from the landlord prior to commencing the job.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // SMOKING SECTION
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
          value: '18. Smoking ',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Smoking is prohibited inside the premises including the garage.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // GARDEN SECTION
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
          value: '19. Gardens',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Unless stated otherwise the Tenant shall be responsible for maintaining lawns, gardens and keeping the grounds in a tidy condition at all times. The Tenant is not to remove trees or plants from the garden without written consent from the Landlord, shall water the lawns and gardens as required and remove all garden rubbish from the property.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // RESIDENTIAL SECTION
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
          value: '20. Residential Use',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'The property will only be used for residential purposes and agrees that any commercial purpose shall be limited to administrative work only. The Tenant will not do anything that or allow anything to be done which may annoy various parties, or make extra insurance premiums payable or may make the insurance on the property void. No signage or advertising on or outside the property.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // COSTS SECTION
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
          value: '21. Costs',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant shall be liable to reimburse the Landlord for any reasonable expenses or commissions paid or incurred by the creditor in recovering or attempting to recover any overdue payment that the debtor owes to the creditor under an order of the Tenancy Tribunal.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // Renovations SECTION
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
          value: '22. Renovations',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'Tenant shall not make any renovation, alteration or addition to the premises without the Landlords written consent. The Tenant agrees to not affix cellotape, blu tack, nails to walls, ceilings, floors, doors or any part of the property. Use of existing picture hooks is permitted by the Tenant, the Tenant accepts all responsibility for their use and new non marking removable hooks are allowable.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // PETS SECTION
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
          value: '23. Pets',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'If the Tenancy Agreement does not provide for any pets then no animals, birds or fish are to be kept or brought onto the property at any time, any damage that occurs to the property or chattels caused by not observing this restriction shall be the sole and complete responsibility of the Tenant. Any Pets that are specified as being permitted on the conditions that the Tenant immediately rectifies any damage they may cause to the property, and that the Tenant has all carpets cleaned commercially at the end of the tenancy. Written approval is required from the Landlord if any other pets are to be permitted at the property. Dogs must be restrained during inspections and visits by Property Managers to the premises.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // MAINTENANCE SECTION
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
          value: '24. Maintenance',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'When maintenance needs to occur the Tenant will allow a reasonable amount of time for a tradesperson to be arranged to carry out repairs. The Tenant also agrees to pay the cost for any tradespersons call out charge if prior arrangements to allow the tradesperson to enter the property to effect repairs are not compiled with.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // DAMAGE SECTION
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
          value: '25. Damage',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'The tenant shall be responsible for any loss or damage to the property or any items of inventory, caused wilfully or by neglect. The Tenant shall keep the drain, sanitary appliances and sink waste free from obstruction and be responsible for any plumbing costs arising from blockages caused by negligence or misuse.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // CHATTELS SECTION
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
          value: '26. Fittings / Chattels',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          inners: [
            {
              type: 'Li',
              listStyle: 'number',
              listNum: 'a.',
              value:
                'The tenant must replace all window panes, mirrors and light shades, in the premises if broken. And shall also replace all electric light bulbs in the property as the wear out. The Tenant agrees not to remove any chattels from the premises and shall replace damaged Chattels from the premises, the Tenant  shall replace damaged chattels with others of similar value.',
              fieldProps: { variant: 'body2' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
    // START SPECIFIC LEASE DETAILS
    // PROPERTY MANAGER / LANDLORDS DETAILS
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
          value: 'Property Manager / Landlords Details',
          fieldProps: { variant: 'h4' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: 'Property Managers Details: Rehouser Property Management',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: 'Physical Address for Service: 20 Sawtell Place, Christchurch',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: 'Email Address: admin@rehouser.co.nz',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: 'Phone:',
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
      ],
    },
    // TENANT DETAILS
    ...lessees.map((lessee, idx) => ({
      type: 'Section',
      value: '',
      fieldProps: {},
      layoutProps: {
        variant: 'column',
        wrap: true,
      },
      inners: genLesseeDetails(lessee),
    })),
    // TENANCY MAIN DETAILS
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
          value: 'Tenancy Details',
          fieldProps: { variant: 'h4' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Address of tenancy: ${lease.location}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Type: ${lease.property.type}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Rent: ${rentDollarAmount} to be paid in advance fortnightly`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Bond amount: ${bondDollarAmount}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Rent to be paid into Bank Trust Bank Account No:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Account Name:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Bank:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Branch:`,
          fieldProps: { variant: 'body1', gutterBottom: true },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Reference:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `The Landlord and the Tenant agree that:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `the tenancy shall commence on the ${tenancyStartFormatted}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        isFixedTerm && {
          type: 'Text',
          value: `Fixed term tenancies automatically become periodic upon expiry of the fixed term unless either party gives the other written notice of their intention not to continue the tenancy. That notice must be given no more than 90 days and no less than 21 days before the end of the fixed term`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        isPeriodicTerm && {
          type: 'Text',
          value: `THIS IS A Peridic TERM`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `expiryDateFormatted ${expiryDateFormatted}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },

        {
          type: 'Text',
          value: `Pets permitted ${lease.petsAllowed ? 'YES' : 'NO'}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        lease.petsAllowed && {
          type: 'Text',
          value: `the following pets are allowed: ${lease.pets.map(
            pet => ` ${pet}`
          )}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Maximum occupants ${lease.maximumOccupants}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Chattels included in Tenancy`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `${lease.chattels.map(
            chattel => ` ${prettyEnumVal(chattel)}`
          )}`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `Body Corporate rules attached if is a Unit Title Premises:`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'Text',
          value: `The landlord and tenant sign here to show that they agree to all the terms and conditions in the tenancy agreement and that each party has read the notes on pages 1, 2, and 3 of this agreement. The Tenant understands that this agreement becomes legally binding on signing this document and all Tenants are jointly and severally liable for any debts arising from this tenancy. The Tenant agrees to pay $XXXX before the Landlord will release the keys.`,
          fieldProps: { variant: 'body1' },
          layoutProps: { variant: 'left' },
        },
      ],
    },

    // NEXT SECTION
  ];
};

export default _generateLeasePdfConf;
