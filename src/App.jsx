import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import FoodDetection from './pages/FoodDetection'
import NutritionalSummary from './pages/NutritionalSummary'
import Dashboard from './pages/Dashboard'
import Recommendations from './pages/Recommendations'

function App() {
  const [detectedFoods, setDetectedFoods] = useState([])
  const [nutritionalData, setNutritionalData] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pb-20 md:pb-6 md:ml-64">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/detection" 
              element={
                <FoodDetection 
                  onFoodsDetected={setDetectedFoods}
                  detectedFoods={detectedFoods}
                />
              } 
            />
            <Route 
              path="/summary" 
              element={
                <NutritionalSummary 
                  foods={detectedFoods}
                  onNutritionalData={setNutritionalData}
                />
              } 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>

        <Navigation />
      </div>
    </Router>
  )
}

export default App
