import React, {useState, useEffect} from "react";
import "./App.scss";
import Main from "./containers/Main";
import Admin from "./containers/admin/Admin";
import OwnAdmin from "./containers/ownadmin/OwnAdmin";
import SectionPage from "./containers/sectionPage/SectionPage";
import ComingSoon from "./containers/comingSoon/ComingSoon";
import GlobalParticles from "./components/globalParticles/GlobalParticles";
import {maintenanceMode} from "./portfolio";

function getSection(hash) {
  // Match #/skills, #/experience, #/projects, #/achievements, #/education, #/contact
  const match = hash.match(/^#\/([a-z-]+)$/);
  return match ? match[1] : null;
}

function App() {
  const path = window.location.pathname;
  const search = new URLSearchParams(window.location.search);
  const isAdmin = path === "/admin" || path.endsWith("/admin") || search.has("admin");
  const isOwnAdmin = path === "/ownadmin" || path.endsWith("/ownadmin") || search.has("ownadmin");
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAdmin) return <Admin />;
  if (isOwnAdmin) return <OwnAdmin />;

  if (maintenanceMode.enabled) return <ComingSoon />;

  const section = getSection(hash);
  return (
    <>
      <GlobalParticles />
      {section ? <SectionPage section={section} /> : <Main />}
    </>
  );
}

export default App;
