import { useState, useCallback, useEffect, useRef } from 'react'
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
  SELECTED_COLORS: 'pingenerator_selectedColors',
  FONT_COLOR: 'pingenerator_fontColor',
  FONT_TYPE: 'pingenerator_fontType',
  USE_UPPERCASE: 'pingenerator_useUpperCase',
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

// Default colors for pins
const DEFAULT_COLORS = ['#5C1A1A', '#C41E3A', '#F5DEB3', '#1A4D4D', '#6B8E9E']

function GeneratePage() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [pins, setPins] = useState(() => loadFromStorage(STORAGE_KEYS.PINS, []))
  const [pinCount, setPinCount] = useState(() => loadFromStorage(STORAGE_KEYS.PIN_COUNT, 12))
  const [url, setUrl] = useState(() => loadFromStorage(STORAGE_KEYS.URL, 'https://'))
  const [selectedColors, setSelectedColors] = useState(() => loadFromStorage(STORAGE_KEYS.SELECTED_COLORS, DEFAULT_COLORS))
  const [fontColor, setFontColor] = useState(() => loadFromStorage(STORAGE_KEYS.FONT_COLOR, '#E53935'))
  const [fontType, setFontType] = useState(() => loadFromStorage(STORAGE_KEYS.FONT_TYPE, 'serif'))
  const [useUpperCase, setUseUpperCase] = useState(() => loadFromStorage(STORAGE_KEYS.USE_UPPERCASE, true))
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

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SELECTED_COLORS, selectedColors)
  }, [selectedColors])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FONT_COLOR, fontColor)
  }, [fontColor])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FONT_TYPE, fontType)
  }, [fontType])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USE_UPPERCASE, useUpperCase)
  }, [useUpperCase])

  // Track if this is the initial mount
  const isColorInitialMount = useRef(true)
  const isFontInitialMount = useRef(true)
  const isFontTypeInitialMount = useRef(true)
  const isUpperCaseInitialMount = useRef(true)

  // Update existing pins when colors change (real-time)
  useEffect(() => {
    if (isColorInitialMount.current) {
      isColorInitialMount.current = false
      return
    }
    setPins(prevPins => {
      if (prevPins.length === 0) return prevPins
      const colorsToUse = selectedColors.length > 0 ? selectedColors : DEFAULT_COLORS
      return prevPins.map((pin, idx) => ({
        ...pin,
        color: colorsToUse[idx % colorsToUse.length]
      }))
    })
  }, [selectedColors])

  // Update existing pins when font color changes (real-time)
  useEffect(() => {
    if (isFontInitialMount.current) {
      isFontInitialMount.current = false
      return
    }
    setPins(prevPins => {
      if (prevPins.length === 0) return prevPins
      return prevPins.map(pin => ({
        ...pin,
        fontColor: fontColor
      }))
    })
  }, [fontColor])

  // Update existing pins when font type changes (real-time)
  useEffect(() => {
    if (isFontTypeInitialMount.current) {
      isFontTypeInitialMount.current = false
      return
    }
    setPins(prevPins => {
      if (prevPins.length === 0) return prevPins
      return prevPins.map(pin => ({
        ...pin,
        fontType: fontType
      }))
    })
  }, [fontType])

  // Update existing pins when uppercase changes (real-time)
  useEffect(() => {
    if (isUpperCaseInitialMount.current) {
      isUpperCaseInitialMount.current = false
      return
    }
    setPins(prevPins => {
      if (prevPins.length === 0) return prevPins
      return prevPins.map(pin => ({
        ...pin,
        useUpperCase: useUpperCase
      }))
    })
  }, [useUpperCase])

  const generatePins = useCallback(() => {
    const colorsToUse = selectedColors.length > 0 ? selectedColors : DEFAULT_COLORS
    const newPins = []
    for (let i = 0; i < pinCount; i++) {
      newPins.push({
        id: Date.now() + i,
        title: '{TITLE}',
        shortUrl: '[SHORTURL]',
        color: colorsToUse[i % colorsToUse.length],
        fontColor: fontColor,
        fontType: fontType,
        useUpperCase: useUpperCase,
        image: sampleImages[i % sampleImages.length],
      })
    }
    setPins(newPins)
  }, [pinCount, selectedColors, fontColor, fontType, useUpperCase])

  const shufflePins = useCallback(() => {
    const colorsToUse = selectedColors.length > 0 ? selectedColors : DEFAULT_COLORS
    setPins(prevPins => {
      const shuffled = [...prevPins]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      // Also randomize colors from selected colors
      return shuffled.map(pin => ({
        ...pin,
        color: colorsToUse[Math.floor(Math.random() * colorsToUse.length)]
      }))
    })
  }, [selectedColors])

  const deletePin = useCallback((pinId) => {
    setPins(prevPins => prevPins.filter(pin => pin.id !== pinId))
  }, [])

  const shuffleSinglePin = useCallback((pinId) => {
    const colorsToUse = selectedColors.length > 0 ? selectedColors : DEFAULT_COLORS
    setPins(prevPins => prevPins.map(pin => {
      if (pin.id === pinId) {
        return {
          ...pin,
          color: colorsToUse[Math.floor(Math.random() * colorsToUse.length)],
          image: sampleImages[Math.floor(Math.random() * sampleImages.length)]
        }
      }
      return pin
    }))
  }, [selectedColors])

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

  const changePinLayout = useCallback((pinId, newLayout) => {
    setPins(prevPins => prevPins.map(pin => 
      pin.id === pinId ? { ...pin, layout: newLayout } : pin
    ))
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
        selectedColors={selectedColors}
        onColorsChange={setSelectedColors}
        fontColor={fontColor}
        onFontColorChange={setFontColor}
        fontType={fontType}
        onFontTypeChange={setFontType}
        useUpperCase={useUpperCase}
        onUseUpperCaseChange={setUseUpperCase}
      />
      
      {/* Main Content */}
      <MainContent 
        pins={pins}
        onDeletePin={deletePin}
        onShufflePin={shuffleSinglePin}
        onEditPin={handleEditPin}
        onClearPins={clearPins}
        onLayoutChange={changePinLayout}
        onUpdatePin={updatePin}
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
