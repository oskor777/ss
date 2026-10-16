import React from 'react';
import { useSlides } from './hooks/useSlides';
import SlideShell from './components/SlideShell';
import ProgressBar from './components/ProgressBar';
import NotesPanel from './components/NotesPanel';
import VocabularyDrawer from './components/VocabularyDrawer';
import FloatingEmojis from './components/FloatingEmojis';

// Slide components
import S01_Title from './slides/S01_Title';
import S02_AboutMe from './slides/S02_AboutMe';
import S03_MeetFamily from './slides/S03_MeetFamily';
import S04_Methodology from './slides/S04_Methodology';
import S05_SchoolDay from './slides/S05_SchoolDay';
import S06_WakeUpTime from './slides/S06_WakeUpTime';
import S07_WorkSchoolSchedule from './slides/S07_WorkSchoolSchedule';
import S08_TimeTogether from './slides/S08_TimeTogether';
import S09_ActivitiesTogether from './slides/S09_ActivitiesTogether';
import S10_FavoriteActivity from './slides/S10_FavoriteActivity';
import S11_ThreePartsOfDay from './slides/S11_ThreePartsOfDay';
import S12_FamilyRating from './slides/S12_FamilyRating';
import S13_VennDiagram from './slides/S13_VennDiagram';
import S14_InterestingFacts from './slides/S14_InterestingFacts';
import S15_LifeBalance from './slides/S15_LifeBalance';
import S16_Thanks from './slides/S16_Thanks';

import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { lang, slideCategories } = useLanguage();
  const {
    currentSlide,
    totalSlides,
    direction,
    nextSlide,
    prevSlide,
    goToSlide,
    showNotes,
    toggleNotes,
    showVocab,
    toggleVocab,
    isFullscreen,
    toggleFullscreen,
    touchHandlers
  } = useSlides(16);

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <S01_Title onNext={nextSlide} />;
      case 2:
        return <S02_AboutMe />;
      case 3:
        return <S03_MeetFamily />;
      case 4:
        return <S04_Methodology />;
      case 5:
        return <S05_SchoolDay />;
      case 6:
        return <S06_WakeUpTime />;
      case 7:
        return <S07_WorkSchoolSchedule />;
      case 8:
        return <S08_TimeTogether />;
      case 9:
        return <S09_ActivitiesTogether />;
      case 10:
        return <S10_FavoriteActivity />;
      case 11:
        return <S11_ThreePartsOfDay />;
      case 12:
        return <S12_FamilyRating />;
      case 13:
        return <S13_VennDiagram />;
      case 14:
        return <S14_InterestingFacts />;
      case 15:
        return <S15_LifeBalance />;
      case 16:
        return <S16_Thanks onRestart={() => goToSlide(1)} onOpenVocab={() => toggleVocab()} />;
      default:
        return <S01_Title onNext={nextSlide} />;
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Floating Ambient Emojis */}
      <FloatingEmojis />

      {/* Main Slide Canvas Shell */}
      <SlideShell
        currentSlide={currentSlide}
        direction={direction}
        category={slideCategories[currentSlide - 1]}
        touchHandlers={touchHandlers}
      >
        {renderSlideContent()}
      </SlideShell>

      {/* Bottom Navigation & Utilities Bar */}
      <ProgressBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        goToSlide={goToSlide}
        toggleNotes={toggleNotes}
        showNotes={showNotes}
        toggleVocab={toggleVocab}
        showVocab={showVocab}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Floating Speaker Notes Panel (Press N) */}
      <NotesPanel
        isOpen={showNotes}
        onClose={toggleNotes}
        currentSlide={currentSlide}
      />

      {/* Slide-out Vocabulary Glossary (Press V) */}
      <VocabularyDrawer
        isOpen={showVocab}
        onClose={toggleVocab}
      />
    </div>
  );
}
