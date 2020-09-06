import { gql, useQuery, useMutation } from '@apollo/client';
import { FileInfoFragment } from '../../graphql/fragments/fileInfo';
import Loader from '../Loader';
import Error from '../ErrorMessage';
import FileUploader from '../FileUploader';
import accept from 'attr-accept';
import { is } from 'ramda';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';

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

const AssociatedFiles = ({ filesId, placeId }) => {
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
      <Typography gutterBottom variant="h3">
        Please contact support as you should have files setup for a property
      </Typography>
    );

  return <MappedFiles propertyFiles={data.propertyFiles} placeId={placeId} />;
};

const FileItem = ({ conf, val, propertyFilesId }) => {
  const UPDATE_PROPERTY_FILES_MUTATION = gql`
    mutation UPDATE_PROPERTY_FILES_MUTATION($data: PropertyFilesUpdateInput! $where: PropertyFilesWhereUniqueInput!) {
      updatePropertyFiles(data: $data, where: $where) {
      id
      ${conf.key} {
        ...fileInfo
      }
    }
  }
  ${FileInfoFragment}
`;

  const [updatePropertyFiles, { loading, error, data }] = useMutation(
    UPDATE_PROPERTY_FILES_MUTATION,
    {
      onCompleted: data =>
        toast.success(
          <div>
            <Typography>Updated {conf.title}</Typography>
          </div>
        ),
    }
  );

  const handleRecieveFile = file => {
    updatePropertyFiles({
      variables: {
        where: {
          id: propertyFilesId,
        },
        data: {
          [conf.key]: {
            connect: {
              id: file.id,
            },
          },
        },
      },
    });
  };

  return (
    <FileUploader
      fileParams={{
        folder: conf.folder,
        type: 'private',
      }}
      title={conf.title}
      description={conf.description}
      recieveFile={handleRecieveFile}
      files={
        val === null
          ? []
          : [
              {
                ...val,
              },
            ]
      }
    />
  );
};

const MappedFiles = ({ propertyFiles, placeId }) => {
  if (!propertyFiles)
    return (
      <Typography gutterBottom variant="h3">
        No property files associated. Please contact support so this can be
        setup
      </Typography>
    );

  const filesConf = [
    {
      key: 'codeComplianceCert',
      title: 'Code compliance file label',
      description: 'a describtion for each variable',
      folder: `properties/${placeId}/files/codeComplianceCert`,
    },
    {
      key: 'certOfAcceptance',
      title: 'Certificate of acceptance',
      description: 'a describtion for each variable',
      folder: `properties/${placeId}/files/certOfAcceptance`,
    },
  ];

  return filesConf.map((conf, idx) => {
    return (
      <FileItem
        key={idx}
        propertyFilesId={propertyFiles.id}
        conf={conf}
        val={propertyFiles[conf.key]}
      />
    );
  });
};

export default AssociatedFiles;