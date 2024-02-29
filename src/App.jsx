import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import SignUp from './pages/signup/SignUp'
import Navbar from './component/Navbar'
import Sidebar from './component/sidebar'
import OnlineUser from './component/OnlineUser'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className='App'>
      {authIsReady &&(
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login"/>}
                {user && <Dashboard />}
              </Route>
              <Route path= "/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path ="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
              <Route path= "/login">
                {user && <Redirect to="/" />}
                {!user &&<Login />}
              </Route>
              <Route path= "/signup">
                {user && <Redirect to="/" />}
                {!user && <SignUp />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUser />}
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
