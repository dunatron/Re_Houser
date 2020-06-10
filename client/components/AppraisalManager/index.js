import SuperiorTable from '../SuperiorTable';
import { useQuery, useMutation } from '@apollo/client';
import { RENTAL_APPRAISALS_QUERY } from '../../graphql/queries';
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';
import Loader from '../Loader';
import Error from '../ErrorMessage';

const AppraisalManager = () => {
  const { error, loading, data } = useQuery(RENTAL_APPRAISALS_QUERY);
  const [offerAppraisal, offerAppraisalProps] = useMutation(
    OFFER_RENTAL_APPRAISAL_MUTATION
  );
  if (error) return <Error error={error} />;
  if (loading) return <Loader />;
  const { rentalAppraisals } = data;

  const formattedData = rentalAppraisals.map(appraisal => ({
    ...appraisal,
  }));

  const columns = [
    { title: 'id', field: 'id', editable: false },
    { title: 'location', field: 'location', editable: false },
    { title: 'locationLat', field: 'locationLat', editable: false },
    { title: 'locationLng', field: 'locationLng', editable: false },
    { title: 'rooms', field: 'rooms', editable: false },
    { title: 'bathrooms', field: 'bathrooms', editable: false },
    { title: 'lowRent', field: 'lowRent' },
    { title: 'rent', field: 'rent' },
    { title: 'highRent', field: 'highRent' },
    { title: 'property', field: 'property.id', editable: false },
  ];
  return (
    <>
      <Error error={offerAppraisalProps.error} />
      <SuperiorTable
        // colomns={columns}
        title="Property Appraisals"
        data={formattedData}
        columns={columns}
        options={{
          search: true,
          exportButton: true,
          exportAllData: true, // Flag for export all data instead of rendered data
          filtering: true,
          grouping: true,
          // selection: true,
          sorting: true,
        }}
        editable={{
          isEditable: rowData => rowData.rent === null,
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  offerAppraisal({
                    variables: {
                      data: {
                        rent: parseFloat(newData.rent),
                        lowRent: parseFloat(newData.lowRent),
                        highRent: parseFloat(newData.highRent),
                      },
                      where: {
                        id: oldData.id,
                      },
                    },
                  });
                  // Note remove setTimeout and resolve onCOmpleted or on an error
                  resolve();
                }
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
};

export default AppraisalManager;
