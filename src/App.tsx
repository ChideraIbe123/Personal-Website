import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HeroPage from './pages/HeroPage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HeroPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
