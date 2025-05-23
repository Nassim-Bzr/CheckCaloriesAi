import { Camera, Upload, TrendingUp, Target, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Suivez votre alimentation avec l'IA
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Scannez vos repas et obtenez instantanément leurs informations nutritionnelles
          </p>
          
          {/* Main CTA Button */}
          <Link to="/detection" className="inline-block">
            <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 mx-auto">
              <Camera className="w-6 h-6" />
              <span>Scanner un repas</span>
            </button>
          </Link>
          
          {/* Alternative Upload */}
          <div className="mt-4">
            <Link to="/detection" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Ou uploader une photo</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Calories aujourd'hui</h3>
            <p className="text-2xl font-bold text-primary-600">1,250</p>
            <p className="text-sm text-gray-500">sur 1,800 objectif</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-secondary-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Progression</h3>
            <p className="text-2xl font-bold text-secondary-600">69%</p>
            <p className="text-sm text-gray-500">de l'objectif atteint</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-accent-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Série</h3>
            <p className="text-2xl font-bold text-accent-600">7</p>
            <p className="text-sm text-gray-500">jours consécutifs</p>
          </div>
        </div>

        {/* Recent Meals */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Repas récents</h3>
          <div className="space-y-4">
            {[
              { name: 'Salade César au poulet', time: '12:30', calories: 420, image: '🥗' },
              { name: 'Smoothie aux fruits', time: '09:15', calories: 180, image: '🥤' },
              { name: 'Pâtes bolognaise', time: 'Hier 19:45', calories: 650, image: '🍝' },
            ].map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{meal.image}</div>
                  <div>
                    <p className="font-medium text-gray-800">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{meal.calories} cal</p>
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/dashboard" className="block mt-6">
            <button className="btn-secondary w-full">Voir tout l'historique</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage 