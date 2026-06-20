import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MusicProvider } from './context/MusicContext'

// Pages
import LoginPage from './pages/LoginPage'
import LoveLetter from './pages/LoveLetter'
import PhotoGallery from './pages/PhotoGallery'
import BirthdaySurprise from './pages/BirthdaySurprise'
import CakeCelebration from './pages/CakeCelebration'
import ReasonsILoveYou from './pages/ReasonsILoveYou'
import RelationshipQuiz from './pages/RelationshipQuiz'
import MusicVideoTribute from './pages/MusicVideoTribute'
import FinalMessage from './pages/FinalMessage'

const App: React.FC = () => {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          {/* Entry screen — password protected */}
          <Route path="/" element={<LoginPage />} />

          {/* Pages of the birthday journey */}
          <Route path="/letter" element={<LoveLetter />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="/timeline" element={<BirthdaySurprise />} />
          <Route path="/cake" element={<CakeCelebration />} />
          <Route path="/reasons" element={<ReasonsILoveYou />} />
          <Route path="/quiz" element={<RelationshipQuiz />} />
          <Route path="/tribute" element={<MusicVideoTribute />} />
          <Route path="/final" element={<FinalMessage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
