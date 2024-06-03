import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import AddProject from './pages/Projects/AddProject';
import GetAllProject from './pages/Projects/GetAllProject';
import M from './pages/Projects/M';
import SetHomePageProject from './pages/Projects/SetHomePageProject';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="add" />
              <AddProject />
            </>
          }
        />
        <Route
          path="/addproject"
          element={
            <>
              <PageTitle title="add" />
              <AddProject />
            </>
          }
        />
        <Route
          path="/getallprojects"
          element={
            <>
              <PageTitle title="add" />
              <GetAllProject />
            </>
          }
        />
        <Route
          path="/m"
          element={
            <>
            <M></M>
            </>
          }
        />
      
        <Route
          path="/sethomepageprojects"
          element={
            <>
           <SetHomePageProject></SetHomePageProject>
            </>
          }
        />
      
      </Routes>
    </>
  );
}

export default App;
