import { HashRouter, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Project from './Project';

function App() {

  return (
    <HashRouter>
      <div>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/" />} /> */}
          <Route path="/*" element={<Project />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
