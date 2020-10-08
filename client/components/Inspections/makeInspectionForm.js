const makeRoomField = (roomIdx, item, type) => {
  return {
    type: 'SelectOneEnum',
    key: `${type}-${roomIdx}-${item.name}`,
    __type: 'InspectionFieldStatus',

    fieldProps: {
      label: `${item.name}`,
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

const makeInspectionForm = property => {
  let roomsSection = [];
  let roomIdx = 0;

  const roomFieldsConf = [
    { name: 'walls', label: 'Walls' },
    { name: 'doors', label: 'Doors' },
    { name: 'windows-and-latches', label: 'Windows and Latches' },
    { name: 'qindow-dressings', label: 'Window dressings' },
    { name: 'ceilings', label: 'Celings' },
    { name: 'lights-powerpoints', label: 'Lights / Power points' },
    { name: 'floors', label: 'Floors' },
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
    // make sure chattels are good
    {
      type: 'Section',
      fieldProps: {
        label: 'Chattel conditions',
      },
      //   inners: property.chattels.map((chattel, idx) => ({
      //     type: 'String',
      //     key: `chattel.${chattel}`,
      //     fieldProps: {
      //       label: `${chattel}`,
      //       name: `chattel.${chattel}`,
      //       variant: 'standard',
      //     },
      //     refConf: {
      //       required: {
      //         value: true,
      //         message: `Please supply the condition of the chattel`,
      //       },
      //     },
      //   })),
      inners: property.chattels.map((chattel, idx) =>
        makeRoomField(idx, { name: chattel, label: chattel }, 'chattel')
      ),
    },
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
