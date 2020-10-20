const termsOfEngagementPdfConf = [
  {
    type: 'Section',
    value: '',
    fieldProps: {},
    layoutProps: { variant: 'column', wrap: true },
    inners: [
      {
        type: 'Text',
        value: 'Terms of engagement',
        fieldProps: { variant: 'h2' },
        layoutProps: { variant: 'left' },
      },
      {
        type: 'Text',
        value:
          'These are the terms of engagement a landlord will need to agree to so Rehouser Property Management Ltd can act on their behalf.',
        fieldProps: { variant: 'body1' },
      },
      {
        type: 'Text',
        value:
          'Any reference within this agreement to ‘Law, legislation, legislative provision includes modification, amendment, re-enactment or subordinate legislation or regulations issued in relation to that legislation.',
        fieldProps: { variant: 'body1' },
      },
      {
        type: 'Text',
        value:
          'The OWNER hereby employs Rehouser Property Management Ltd to manage the above property as the Owner’s sole Agent on the terms and conditions set out within this agreement form.',
        fieldProps: { variant: 'body1' },
      },
      {
        type: 'Text',
        value:
          'The OWNER instructs Rehouser Property Management Ltd to act as the Agent for the Owner in relation to the Tenant and the tenancy.',
        fieldProps: { variant: 'body1' },
      },
      {
        type: 'List',
        fieldProps: { variant: 'ol', type: 'A', start: 'F' },
        inners: [
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '1.',
            title: 'Rent Payments.',
            value:
              'To receive rent payments at the agreed amount owing on the OWNERs property and to transfer rent owed by direct credit twice monthly (on the 1st and 15th of each month, or next respective business day) to the outlined bank account. Rent owed will be paid by the tenant 2 weeks in advance.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '2.',
            title: 'Assess Rent.',
            value:
              'To assess weekly rent rate regularly to ensure market rent is being obtained by the property in accordance with the Residential Tenancies Act 1986.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '3.',
            title: 'Manage Leases.',
            value:
              'To manage existing tenancies and allocate new tenants/tenancies when required and to prepare and sign tenancy agreements on my/our behalf the Owner as the landlord. This will include:',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
            inners: [
              {
                type: 'List',
                fieldProps: { variant: 'ul', type: 'A', start: 'F' },
                inners: [
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: 'market the property accordingly.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: 'completing credit checks on potential tenants.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'To collect bonds to be paid to the Tenancy Service(Ministry of Business and Innovation) on my/our behalf at a rate of three or four weeks rent. The bond will be paid within 21 days of receipt and to refund any part of the bonds at the end of tenancies that Rehouser Property Managememnt Ltd decides is fair and reasonable.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'be proactive and take reasonable steps in order to ensure payment of rent is timely and enforce the Terms and Conditions of the Tenancy agreement. A debt collection agency may be appointed at the Owners discretion to obtain money owed from the tenant.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Rehouser Property Management Ltd has the right to exercise Landlords right to end a Tenancy or serve notices to a Tenant and take reasonable action against the Tenant which may involve obtaining an order of possession or an order to terminate the tenancy with assistance from the Tribunal.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'complete dispute resolution with tenants by negotiation, mediation or by attending the tribunal',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                ],
              },
            ],
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '4.',
            title: 'Perform Inspections.',
            value:
              'Complete thorough inspections of the property as directed by the Owner and between tenancies, prior to refunding any bond to the appropriate tenant. Following the regular inspection report to me/us following these inspections, updating you on any concerns we have identified.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '5.',
            title: 'Maintenance and Repairs.',
            value:
              'To organise repairs and maintenance on the property or as agreed with the Owner:',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
            inners: [
              {
                type: 'List',
                fieldProps: { variant: 'ul', type: 'A', start: 'F' },
                inners: [
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Repairs to the property, one repair not to exceed $300 plus GST - no approval will be requested.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'After approval is granted where the cost of the required repairs will be beyond $300 plus GST will the work be completed.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Repairs in an emergency situation that Rehouser Property Management Ltd consider will impact the comfort and/or rentability of the property, or Health and Safety issues will not require my/our approval if I cannot be contacted. Best efforts to contact you will be made',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                ],
              },
            ],
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '6.',
            title: 'Organise Repairs.',
            value:
              'To organise for and supervise any major repairs or renovations to the property, as authorised by the Owner.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '7.',
            title: 'Attend Tribunals.',
            value:
              'To attend Mediation and/or Tribunal Hearings, pursuant to the Residential Tenancies Act 1986, on my behalf. I agree to be bound by any order made by the Tenancy Tribunal.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '8.',
            title: 'Track Inventory.',
            value:
              'To prepare an inventory (where applicable) and to check the same.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '9.',
            title: 'Handle Debt.',
            value:
              'If necessary, to appoint, at your discretion, a debt collection agency to obtain debts from tenants or to pursue collection of any debt through the Ministry of Justice Collections Unit. I/we authorise you to pay all associated fees on my/our behalf..',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '10.',
            title: 'Holiday Rentals.',
            value:
              'Rehouser property Management Ltd shall be entitled to be remunerated for its services for holiday rentals as follows:',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
            inners: [
              {
                type: 'List',
                fieldProps: { variant: 'ul', type: 'A', start: 'F' },
                inners: [
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: '10.5% of all rents collected',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                ],
              },
            ],
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '11.',
            title: 'Service Fees.',
            value:
              'Rehouser Property Management Ltd will be remunerated for the services it delivers – this is also outlined on our schedule of fees: Rehouser Property Management Ltd can alter their fees by providing one months notice written.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
            inners: [
              {
                type: 'List',
                fieldProps: { variant: 'ul', type: 'A', start: 'F' },
                inners: [
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Rental Income Collected - 7% will be Rehouser Property Management Ltd’s Fee.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'on completion of each individual inspection for each Owners property - $50. Note: Final inspections at the end a tenancy and initial inspections are not charged.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: 'repairs / maintenance, 7% on costs incurred.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: 'renovations - as discussed.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value: 'Tribunal presence - $40 including GST.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'legal fees if there are any in relation to an attendance at the tenancy tribunal, mediation or legal proceeding - these will be discussed with you at the time.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'debt collection expenses, costs and debt will be passed onto the Owner.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'any other costs incurred to Rehouser Property Management not outlined here necessary for the agent to complete their management of the property - these will be discussed with you at the time.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Advertising fee of $69 + GST per listing. Not on charged for long term tenancies.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                  {
                    type: 'Li',
                    listStyle: 'bullet',
                    value:
                      'Approval may be asked to supply cleaning services at the end of the tenancy and a quote will be obtained prior to this commencing.',
                    fieldProps: { variant: 'body1' },
                    layoutProps: { variant: 'left' },
                  },
                ],
              },
            ],
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '12.',
            title: 'Consent To Pay Bills.',
            value:
              'The Owner gives consent for Rehouser Property Management Ltd to pay relevant bills which have been authorised in the accounts to be paid section in the appendix 2. These amounts will be deducted from rent when the cost is incurred. If the bills are in excess of the rent collected then the Owner will pay the difference as soon as possible to Rehouser Property Management Ltd. A statement will be provided to the Owner outlining all of the money that has been paid to the Owner at the end of the tenancy or when requested.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '13.',
            title: 'Consent To Pay Rates and Insurance.',
            value:
              'Rehouser Property Management Ltd is as where stated to pay outgoings regularly (rates, insurances, etc). Rehouser Property Management Ltd will be permitted to deduct fees for services and compensation for monies expended on my account, from any monies collected from rent. Where there are no monies held I/we agree to compensate Rehouser Property Management Ltd within fourteen days of receiving the request.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '14.',
            title: 'Insurance Protection.',
            value:
              'Rehouser Property Management Ltd is not responsible for arranging Landlord Insurance Protection unless is instructed to do so in writing by the Owner for the specified property.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '15.',
            title: 'Property Continuity.',
            value:
              'Rehouser Property Management Ltd shall use its best endeavours to ensure continuity of rental and maintenance of the property(ies), but shall not be liable for any default in payment of rent or any damage caused to the property, vacant or occupied, by any tenant or otherwise, whether or not a tenancy has been arranged by Rehouser Property Management Ltd.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '16.',
            title: 'Hazard Liability.',
            value:
              'Rehouser Property Management Ltd shall not be responsible for any injury to persons and/or damage to the property arising out of the condition of, or any hazard in or about, the property.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '17.',
            title: 'Signed Warrants.',
            value:
              'The undersigned warrants to have the authority of all of the Owners of the property(ies) to make this appointment.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '18.',
            title: 'Service Termination.',
            value:
              'The owner(s) may terminate Rehousers Ltd involvement by giving three calendar months notice in writing. Our minimum fee will apply. Rehouser Property Management Ltd reserves the right to cancel this agreement without notice.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
          {
            type: 'Li',
            listStyle: 'number',
            listNum: '19.',
            title: 'Required Keys.',
            value:
              'Three sets of keys are required for new management. If the owner does provide three sets of keys, Rehouser Property Management Ltd is entitled to organise this at the owners cost.',
            fieldProps: { variant: 'body1' },
            layoutProps: { variant: 'left' },
          },
        ],
      },
    ],
  },
];

export default termsOfEngagementPdfConf;
