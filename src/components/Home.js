import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {


  return (
    <>
      <ToastContainer />
      <Header className="header" />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default Home;
