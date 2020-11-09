import { gql, useLazyQuery } from '@apollo/client';
import Error from '@/Components/ErrorMessage';

const CRASH_ME_QUERY = gql`
  query crashMe {
    crashMe {
      id
      firstName
    }
  }
`;

const ASYNC_CRASH_ME_QUERY = gql`
  query crashMe {
    asyncCrashMe {
      id
      firstName
    }
  }
`;

const CrashesContainer = () => {
  return (
    <div>
      I WILL HANDLE TEST CRASHES
      <CrashServerNotDefined />
      <CrashServerPromise />
    </div>
  );
};

const CrashServerNotDefined = () => {
  const [loadCrash, { called, loading, data, error }] = useLazyQuery(
    CRASH_ME_QUERY,
    {
      variables: { language: 'english' },
    }
  );
  if (error) return <Error error={error} />;
  if (called && loading) return <p>Loading ...</p>;
  if (!called) {
    return <button onClick={() => loadCrash()}>Load Crash Me</button>;
  }
  return <h1>Hello {JSON.stringify(data)}!</h1>;
};

const CrashServerPromise = () => {
  const [loadCrash, { called, loading, data, error }] = useLazyQuery(
    ASYNC_CRASH_ME_QUERY,
    {
      variables: { language: 'english' },
    }
  );
  if (error) return <Error error={error} />;
  if (called && loading) return <p>Loading ...</p>;
  if (!called) {
    return <button onClick={() => loadCrash()}>Load Promise Crash Me</button>;
  }
  return (
    <h1>
      Hello {JSON.stringify(data)}! <Error error={error} />
    </h1>
  );
};

export default CrashesContainer;
