import { gql, useQuery, useMutation } from '@apollo/client';
import { FileInfoFragment } from '../../graphql/fragments/fileInfo';
import Loader from '../Loader';
import Error from '../ErrorMessage';
import FileUploader from '../FileUploader';
import accept from 'attr-accept';
import { is } from 'ramda';

const PROPERTY_FILES_QUERY = gql`
  query PROPERTY_FILES_QUERY($where: PropertyFilesWhereUniqueInput!) {
    propertyFiles(where: $where) {
      id
      property {
        id
      }
      codeComplianceCert {
        ...fileInfo
      }
      certOfAcceptance {
        ...fileInfo
      }
    }
  }
  ${FileInfoFragment}
`;
/**
 *
 * Firstly we will query for the fragment of associated files(files) field.
 * we will then Know that is an object with keys on it. may need to filter out __type
 * map over object then for the keys check if it has a value for create or update on this object
 */
const AssociatedFiles = ({ filesId }) => {
  const { data, loading, error } = useQuery(PROPERTY_FILES_QUERY, {
    variables: {
      where: {
        id: filesId,
      },
    },
  });
  if (loading)
    return <Loader loading={loading} text="Loading property files" />;
  if (error) return <Error error={error} />;

  if (!data.propertyFiles)
    return (
      <div>
        Please contact support as you should have files setup for a property
      </div>
    );

  return <MappedFiles propertyFiles={data.propertyFiles} />;
};

const FileItem = ({ itemKey, val }) => {
  console.log('FileItem: key => ', itemKey);
  console.log('FileItem: val => ', val);
  const [updatePropertyFiles, { loading, error, data }] = useMutation();

  const handleRecieveFile = file => {
    alert('recieved file. ToDo: associate it with the propertyFilesObj');
    console.log('recieved File');
  };

  return (
    <FileUploader
      title={itemKey}
      recieveFile={handleRecieveFile}
      files={
        val === null
          ? []
          : [
              {
                [itemKey]: val,
              },
            ]
      }
    />
  );
};

const filesConf = [
  {
    key: 'codeComplianceCert',
    label: 'COde compliance file label',
  },
];

// Was just trying a different way. revamp to a config ^^

const MappedFiles = ({ propertyFiles }) => {
  const allowedKeys = ['codeComplianceCert', 'certOfAcceptance'];
  if (!propertyFiles)
    return (
      <div>
        No property files associated. Please contact support so this can be
        setup
      </div>
    );
  return Object.entries(propertyFiles).reduce((a, [key, val]) => {
    if (!allowedKeys.includes(key)) return a;
    return [...a, <FileItem itemKey={key} val={val} />];
  }, []);
};

export default AssociatedFiles;
