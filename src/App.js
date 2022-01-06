import './App.css';
import React from 'react';
import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';

import RelayEnvironment from './RelayEnvironment';


const {Suspense} = React;

// Define a query
const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook" name: "relay") {
      name,
      id
    }
  }
  `;

  const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {

  });


  function App(props) {
    const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);


  // const [name, setName] = useState(null);
  // const [id, setId] = useState(null);
  //
  // useEffect(() => {
  //   // let isMount = true;
  //   fetchGraphQL().then(response => {
  //       const data = response.data;
  //       setName(data.repository.name);
  //       setId(data.repository.id);
  //
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   return () => {};
  // }, [fetchGraphQL]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
        {data.repository.name != null ? `Repository: ${data.repository.name} and id: ${data.repository.id}` : "Loading"}
        </p>
      </header>
    </div>
  );
}



  function AppRoot(props) {
    return (
      <RelayEnvironmentProvider environment = {RelayEnvironment}>
        <Suspense fallback={'Loading....'}>
          <App preloadedQuery={preloadedQuery}/>
        </Suspense>
      </RelayEnvironmentProvider>
    );
  }

export default AppRoot;
