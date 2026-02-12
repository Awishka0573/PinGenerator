import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Header, Sidebar, MainContent, Footer } from '@/components/layout'
import { PinEditModal } from '@/components/pins'
import { SchedulePage } from '@/pages'
import './App.css'

// LocalStorage keys
const STORAGE_KEYS = {
  PINS: 'pingenerator_pins',
  PIN_COUNT: 'pingenerator_pinCount',
  URL: 'pingenerator_url',
}

// Helper functions for localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (e) {
    console.error('Failed to load from localStorage:', e)
    return defaultValue
  }
}

// Sample images for demo pins
const sampleImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop',
]

const pinColors = ['pink', 'orange', 'peach', 'coral', 'green', 'sage']

function GeneratePage() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [pins, setPins] = useState(() => loadFromStorage(STORAGE_KEYS.PINS, []))
  const [pinCount, setPinCount] = useState(() => loadFromStorage(STORAGE_KEYS.PIN_COUNT, 12))
  const [url, setUrl] = useState(() => loadFromStorage(STORAGE_KEYS.URL, 'https://'))
  const [editingPin, setEditingPin] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Persist pins to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PINS, pins)
  }, [pins])

  // Persist settings to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PIN_COUNT, pinCount)
  }, [pinCount])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.URL, url)
  }, [url])

  const generatePins = useCallback(() => {
    const newPins = []
    for (let i = 0; i < pinCount; i++) {
      newPins.push({
        id: Date.now() + i,
        title: '{TITLE}',
        shortUrl: '[SHORTURL]',
        color: pinColors[i % pinColors.length],
        image: sampleImages[i % sampleImages.length],
      })
    }
    setPins(newPins)
  }, [pinCount])

  const shufflePins = useCallback(() => {
    setPins(prevPins => {
      const shuffled = [...prevPins]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      // Also randomize colors
      return shuffled.map(pin => ({
        ...pin,
        color: pinColors[Math.floor(Math.random() * pinColors.length)]
      }))
    })
  }, [])

  const deletePin = useCallback((pinId) => {
    setPins(prevPins => prevPins.filter(pin => pin.id !== pinId))
  }, [])

  const shuffleSinglePin = useCallback((pinId) => {
    setPins(prevPins => prevPins.map(pin => {
      if (pin.id === pinId) {
        return {
          ...pin,
          color: pinColors[Math.floor(Math.random() * pinColors.length)],
          image: sampleImages[Math.floor(Math.random() * sampleImages.length)]
        }
      }
      return pin
    }))
  }, [])

  const handleEditPin = useCallback((pin) => {
    setEditingPin(pin)
    setIsModalOpen(true)
  }, [])

  const updatePin = useCallback((updatedPin) => {
    setPins(prevPins => prevPins.map(pin => 
      pin.id === updatedPin.id ? updatedPin : pin
    ))
  }, [])

  const clearPins = useCallback(() => {
    setPins([])
    saveToStorage(STORAGE_KEYS.PINS, [])
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isVisible={sidebarVisible} 
        onToggle={() => setSidebarVisible(!sidebarVisible)}
        url={url}
        setUrl={setUrl}
        pinCount={pinCount}
        setPinCount={setPinCount}
        onGeneratePins={generatePins}
        onShufflePins={shufflePins}
      />
      
      {/* Main Content */}
      <MainContent 
        pins={pins}
        onDeletePin={deletePin}
        onShufflePin={shuffleSinglePin}
        onEditPin={handleEditPin}
        onClearPins={clearPins}
      />

      {/* Edit Modal */}
      <PinEditModal 
        pin={editingPin}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={updatePin}
      />
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
