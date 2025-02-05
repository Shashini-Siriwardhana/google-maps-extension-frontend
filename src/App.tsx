import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard';
import TopBar from './components/TopBar';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from './utils/constants';


function App() {

  const libraries = ["places"]

  return (
    <>
      <div>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <main className="main" style={{marginTop: "60px"}}>
          <TopBar/>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
        </main>
        </APIProvider>
      </div>
    </>
  )
}

export default App
