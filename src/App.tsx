import { useEffect, useState } from 'react';
import {
  LaptopDiveHero,
  DiveStage,
  PortfolioTabId,
} from './components/sections/LaptopDiveHero';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { PersonalProjectsSection } from './components/sections/PersonalProjectsSection';
import { FooterSection } from './components/sections/FooterSection';

export function App() {
  const [diveStage, setDiveStage] = useState<DiveStage>('hero');
  const [activeTab, setActiveTab] = useState<PortfolioTabId>('about');
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [activePersonalIndex, setActivePersonalIndex] = useState<number>(0);

  // Lock outer window scroll; all scrolling happens inside the laptop screen (.hd-screen-scroll)
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#061c14] text-[#d8f8e7] font-mono">
      <LaptopDiveHero
        stage={diveStage}
        onStageChange={setDiveStage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeCaseIndex={activeCaseIndex}
        onSelectCase={setActiveCaseIndex}
        activePersonalIndex={activePersonalIndex}
        onSelectPersonal={setActivePersonalIndex}
      >
        <main
          key={`${activeTab}-${activeCaseIndex}-${activePersonalIndex}`}
          className="h-full"
        >
          {activeTab === 'projects' && (
            <ProjectsSection
              activeCaseIndex={activeCaseIndex}
              onSelectCase={setActiveCaseIndex}
            />
          )}
          {activeTab === 'personal' && (
            <PersonalProjectsSection
              activePersonalIndex={activePersonalIndex}
              onSelectPersonal={setActivePersonalIndex}
            />
          )}
          {activeTab === 'about' && <AboutSection />}
          {activeTab === 'services' && <ServicesSection />}
          {activeTab === 'contact' && <FooterSection />}
        </main>
      </LaptopDiveHero>
    </div>
  );
}

export default App;
