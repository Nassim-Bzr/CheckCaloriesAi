import { Link, useLocation } from 'react-router-dom'
import { Home, Camera, PieChart, BarChart3, Lightbulb } from 'lucide-react'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/detection', icon: Camera, label: 'Scanner' },
    { path: '/summary', icon: PieChart, label: 'Résumé' },
    { path: '/dashboard', icon: BarChart3, label: 'Tableau de bord' },
    { path: '/recommendations', icon: Lightbulb, label: 'Conseils' },
  ]

  return (
    <>
      {/* Mobile Navigation - Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Navigation - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white shadow-soft flex-col pt-20 z-30">
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50 border border-primary-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
        
        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Utilisateur</p>
              <p className="text-sm text-gray-500">Objectif: Perte de poids</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation 