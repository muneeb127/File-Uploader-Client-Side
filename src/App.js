import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {NavbarComponent} from './components/Navbar/index';
import Home from './pages/Home';
import Files from './pages/Files';
import ShareFile from './pages/ShareFile';

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
          <BrowserRouter>
              <Routes>
                  <Route exact path = "/" element = {<Home />} />
                  <Route path="/allfiles" element = {<Files />}/>
                  <Route path="/sharefile" element = {<ShareFile />} />      
              </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
