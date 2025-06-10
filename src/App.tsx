import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import AddProject from './pages/Projects/AddProject';
import GetAllProject from './pages/Projects/GetAllProject';
import SetHomePageProject from './pages/Projects/SetHomePageProject';
import ShowAllMessages from './pages/messages/ShowAllMessages';
import ShowAllBlogs from './pages/blogs/ShowAllBlogs';
import AddBlog from './pages/blogs/AddBlog';
import ShowBlog from './pages/blogs/ShowBlog';

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
        <Route path="/blogs" element={<ShowAllBlogs />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<ShowBlog />} />
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
              <GetAllProject />
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

        <Route
          path="/showallmessages"
          element={
            <>
              <ShowAllMessages></ShowAllMessages>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
