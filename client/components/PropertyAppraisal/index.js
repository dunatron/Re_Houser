import { FormCreator } from '../Forms';

const PropertyAppraisal = ({ propertyId }) => {
  // we could check if this property has already been appraised
  // could check how many times via getting count the user has tried a "Free Appraisal", maybe 2 per User
  // then must have a property created.
  // do we charge for these

  // 1 just hit create

  // 1. createFreeAppraisal // takes in a minimum set of property props. Will send an email, with the data
  // 2. createAppriasial. The server will determine if to link to a property
  // 3. feed in appraisal data to an email that goes to create property

  return (
    <>
      <FormCreator
        // Im sayingyou wre about to pass props in toa component that doesnt want them, then hand them somewhere,
        // and transform them again somewhere. Slow actions dopwn, let thoughts race, dont let thoughts paralyze, now try move, with precision
        // kkep first char, and work with result.length.3
        // You see, you will find me
        //  - probably in the sky flying with the fishes
        //  - or maybe in the ocean swimming with the pidgeons
        //  - c://my-world-is-diff
        // like the meta meets tron with a little divine intervention
        // onSubmit={() => alert('I m a monster i tell ya')}
        // onSubmit={() => alert('so WHO u, fuck u i am')}

        onSubmit={() => {
          // No no nbo no, do the mutation, hit that generic servber func u said about earlier. It will do heeavy lifty
          // if (propertyId) {
          //   alert(
          //     'Attach Appraisal to property. If it has  property it just beacomes the most recent appraisal'
          //   );
          // } else {
          //   alert('Create new Appraisal with no id attached');
          // }
          alert(
            'Submit both new property attached and non attahced, let server handle it'
          );
          // return Appraisal has been attached to property.
          // the query would get the most recent one
        }}
        data={{
          heatSources: ['HEAT_PUMP'],
        }}
        config={[
          {
            type: 'String',
            key: 'location',
            fieldProps: {
              name: 'location',
              label:
                'Lodation of property. SHould probs use google like normal property picker',
            },
            refConf: {
              required: {
                value: true,
                message: 'You need a location to appraise a property...',
              },
            },
          },
          {
            type: 'Int',
            key: 'numberOfBedRooms',
            fieldProps: {
              name: 'numberOfBedRooms',
              label: 'number of bedrooms on the property',
            },
            refConf: {
              required: {
                value: true,
                message:
                  'You need to supply the number of bedrooms on the property for an appraisal',
              },
            },
          },
          //   __type,
          //   values,
          //   label,
          //   selectID,
          //   handleChange,
          //   removeItem,
          {
            type: 'SelectMultipleEnum',
            __type: 'HeatSource',
            key: 'heatSources',
            fieldProps: {
              name: 'heatSources',
              label: 'select all valid heat source on propery',
              //   defaultValue: ['FIRE_PLACE'],
            },

            refConf: {
              required: {
                value: true,
                message:
                  'You need to supply the number of bedrooms on the property for an appraisal',
              },
            },
          },
        ]}
      />
    </>
  );
};

export default PropertyAppraisal;
