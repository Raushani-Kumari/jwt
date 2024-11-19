import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/jwt-ui/LogIn';
import Signup from './components/jwt-ui/Signup';
import Home from './components/jwt-ui/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserProvider } from './context/UserContext';
import Admin from './components/jwt-ui/Admin';

function App() {
  return (
    // <Router>
    //   <div className="app">
    //     <h1>React Crud Operation</h1>
    //     <Routes>
    //       <Route exact path='/create' Component={Create} />
    //       <Route exact path='/read' Component={Read} />
    //       <Route exact path='/update' Component={Update} />
    //     </Routes>
    //   </div>
    // </Router>
<UserProvider>
    <Router>
      <div className='app'>

      {/* <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute roles={['USER', 'ADMIN']} />}>
            <Route path="" element={<HomePage />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route path="" element={<AdminPage />} />
          </Route>
        </Routes> */}

        <Routes>
          <Route element={<ProtectedRoute roles={['user', 'admin', 'seller']} />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/admin' element={<ProtectedRoute roles={['admin']}/>}>
          <Route path='/admin' element={<Admin />} />
          </Route>
          <Route exact path='/' element={<LogIn />} />
          <Route exact path='/login' element={<LogIn/>} />
          <Route exact path='/Signup' element={<Signup/>} />

        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
