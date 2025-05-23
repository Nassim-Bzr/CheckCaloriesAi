import { Salad, Menu } from 'lucide-react'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-card fixed top-0 left-0 right-0 z-50 md:left-64">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-500 p-2 rounded-xl">
            <Salad className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">CheckCalories</h1>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Header 