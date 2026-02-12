import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Header, Sidebar, MainContent, Footer } from '@/components/layout'
import { SchedulePage } from '@/pages'
import './App.css'

function GeneratePage() {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isVisible={sidebarVisible} 
        onToggle={() => setSidebarVisible(!sidebarVisible)} 
      />
      
      {/* Main Content */}
      <MainContent />
    </div>
  )
}

function AppShell() {
  const location = useLocation()
  const hideFooter = location.pathname === '/' || location.pathname === '/generate'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Routes */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<GeneratePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
