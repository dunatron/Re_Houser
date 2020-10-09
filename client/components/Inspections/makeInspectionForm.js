const makeRoomField = (roomIdx, item, type) => {
  return {
    type: 'SelectOneEnum',
    key: `${type}-${roomIdx}-${item.name}`,
    __type: 'InspectionFieldStatus',

    fieldProps: {
      label: `${item.label}`,
      name: `${type}-${roomIdx}-${item.name}`,
      variant: 'standard',
    },
    inners: [
      {
        type: 'String',
        key: `${type}-${roomIdx}-${item.name}-comment`,
        parentShowVals: ['MISSING', 'POOR', 'AVERAGE', 'VERY_GOOD'],
        fieldProps: {
          label: 'Comment ',
          name: `${type}-${roomIdx}-${item.name}-comment`,
          placeholder: `comments for ${item.label}`,
          multiline: true,
          rowsMax: 6,
          rows: 2,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {},
      },
    ],
    refConf: {
      required: {
        value: true,
        message: `Please select a condition status for ${item.label}`,
      },
    },
  };
};

const makeFieldsFromLoop = (conf, loopTimes, label, type) => {
  let section = [];
  let itemIdx = 0;
  do {
    itemIdx++;
    section.push({
      type: 'Section',
      fieldProps: {
        label: `${label} ${itemIdx}`,
      },
      inners: conf.map(item => makeRoomField(itemIdx, item, type)),
    });
  } while (itemIdx < loopTimes);
  return section;
};

const makeInspectionForm = property => {
  let roomsSection = [];
  let roomIdx = 0;

  const genericFields = [
    { name: 'walls', label: 'Walls' },
    { name: 'doors', label: 'Doors' },
    { name: 'windows-and-latches', label: 'Windows and Latches' },
    { name: 'window-dressings', label: 'Window dressings' },
    { name: 'ceilings', label: 'Ceilings' },
    { name: 'lights-powerpoints', label: 'Lights / Power points' },
    { name: 'floors', label: 'Floors' },
  ];

  const propertyInfoFieldsConf = [
    { name: 'smoke-detectors', label: 'Smoke Detectors' },
    { name: 'power-icp-num', label: 'Power ICP Number' },
    { name: 'water-main-tap-location', label: 'Water main tap location' },
    { name: 'rubbish-bins-supplied', label: 'Rubbish bins supplied' },
  ];

  const loungeFieldsConf = [...genericFields];

  const kitchenFieldsConf = [
    ...genericFields.filter(item => item.name !== 'doors'),
    { name: 'stove-hobs-rangehood', label: 'Stove / Hobs / Range hood' },
    { name: 'cupboards-drawers', label: 'Cupboards / Drawers' },
    { name: 'sink-taps', label: 'Sink / Taps' },
    { name: 'benches', label: 'Benches' },
  ];

  const laundryFieldsConf = [
    ...genericFields,
    { name: 'cupboards', label: 'Cupboards' },
    { name: 'washtub-taps', label: 'Wash Tub / Taps' },
    {
      name: 'washing-machine-connections',
      label: 'Washing machine connections',
    },
  ];

  const bathroomConf = [
    ...genericFields,
    { name: 'mirror-cabinet', label: 'Mirror / Cabinet' },
    { name: 'shower', label: 'Shower' },
    { name: 'bath', label: 'Bath' },
    { name: 'basin', label: 'Basin' },
    { name: 'tapware', label: 'Tapware' },
  ];

  const bathroomsSection = makeFieldsFromLoop(
    bathroomConf,
    property.bathrooms,
    'Bathrooms',
    'bathroom'
  );

  const roomFieldsConf = [
    ...genericFields,
    { name: 'wardrobe', label: 'Wardrobe' },
    { name: 'other', label: 'Other' },
  ];

  do {
    roomIdx++;
    roomsSection.push({
      type: 'Section',
      fieldProps: {
        label: `Bedroom ${roomIdx}`,
      },
      inners: roomFieldsConf.map(item => makeRoomField(roomIdx, item, 'room')),
    });
  } while (roomIdx < property.rooms);

  return [
    {
      type: 'Section',
      fieldProps: {
        label: 'Property Information',
      },
      inners: [
        ...propertyInfoFieldsConf.map((item, idx) =>
          makeRoomField(idx, item, 'property-info')
        ),
      ],
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Chattel conditions',
      },
      inners: property.chattels.map((chattel, idx) =>
        makeRoomField(idx, { name: chattel, label: chattel }, 'chattel')
      ),
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Lounge',
      },
      inners: [
        ...loungeFieldsConf.map((item, idx) =>
          makeRoomField(idx, item, 'lounge')
        ),
      ],
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Kitchen',
      },
      inners: [
        ...kitchenFieldsConf.map((item, idx) =>
          makeRoomField(idx, item, 'kitchen')
        ),
      ],
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Laundry',
      },
      inners: [
        ...laundryFieldsConf.map((item, idx) =>
          makeRoomField(idx, item, 'laundry')
        ),
      ],
    },
    ...bathroomsSection,
    ...roomsSection, // spread in the array of room section objects
    {
      type: 'Section',
      fieldProps: {
        label: 'Indoor feature',
      },
      inners: property.indoorFeatures.map((feature, idx) =>
        makeRoomField(idx, { name: feature, label: feature }, 'indoor-feature')
      ),
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Outdoor feature',
      },
      inners: property.outdoorFeatures.map((feature, idx) =>
        makeRoomField(idx, { name: feature, label: feature }, 'outdoor-feature')
      ),
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Heat Sources',
      },
      inners: property.heatSources.map((source, idx) =>
        makeRoomField(idx, { name: source, label: source }, 'heat-source')
      ),
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Pets',
      },
      inners: [
        {
          type: 'Info',
          content: `Please ensure that the only pets on the property are ${property.pets.reduce(
            (acc, curr) => (acc = acc + ', ' + curr)
          )}`,
        },
        {
          type: 'String',
          key: `pets-comment`,
          fieldProps: {
            label: 'Pets comment',
            name: `pets-comment`,
            placeholder: `comments for pets`,
            multiline: true,
            rowsMax: 6,
            rows: 2,
            margin: 'dense',
            style: {
              marginTop: 0,
            },
          },
          refConf: {},
        },
      ],
    },
    {
      type: 'Section',
      fieldProps: {
        label: 'Recommendation / Comments',
      },
      inners: [
        {
          type: 'String',
          key: `recommendation-comments`,
          fieldProps: {
            label: 'Recommendation / Comments',
            name: `recommendation-comments`,
            placeholder: `overall recomendation for the property after the inspection`,
            multiline: true,
            rowsMax: 6,
            rows: 4,
            margin: 'dense',
            style: {
              marginTop: 0,
            },
          },
          refConf: {},
        },
      ],
    },
  ];
};

export default makeInspectionForm;
