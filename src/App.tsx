import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AccountPage from "@/pages/AccountPage";
import ProjectPage from "@/pages/ProjectPage";
import ExperiencePage from "@/pages/ExperiencePage";
import SkillsPage from "@/pages/SkillsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Routes>
    </Router>
  );
}
