import { useState } from 'react'
import { Calendar, TrendingUp, Target, Award, Filter, Download, MoreVertical } from 'lucide-react'

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Données mockées pour la démonstration
  const weeklyData = [
    { day: 'Lun', calories: 1850, target: 1800 },
    { day: 'Mar', calories: 1750, target: 1800 },
    { day: 'Mer', calories: 1920, target: 1800 },
    { day: 'Jeu', calories: 1680, target: 1800 },
    { day: 'Ven', calories: 1780, target: 1800 },
    { day: 'Sam', calories: 2100, target: 1800 },
    { day: 'Dim', calories: 1650, target: 1800 },
  ]

  const mealHistory = [
    { id: 1, date: 'Aujourd\'hui', time: '12:30', name: 'Salade César', calories: 420, type: 'déjeuner', image: '🥗' },
    { id: 2, date: 'Aujourd\'hui', time: '09:15', name: 'Smoothie protéiné', calories: 180, type: 'petit-déjeuner', image: '🥤' },
    { id: 3, date: 'Hier', time: '19:45', name: 'Saumon grillé', calories: 650, type: 'dîner', image: '🐟' },
    { id: 4, date: 'Hier', time: '13:00', name: 'Bowl de quinoa', calories: 480, type: 'déjeuner', image: '🥙' },
    { id: 5, date: 'Hier', time: '08:30', name: 'Avocado toast', calories: 320, type: 'petit-déjeuner', image: '🥑' },
    { id: 6, date: 'Avant-hier', time: '20:00', name: 'Pâtes aux légumes', calories: 580, type: 'dîner', image: '🍝' },
  ]

  const CalorieBar = ({ day, calories, target }) => {
    const percentage = Math.min((calories / target) * 100, 120)
    const isOverTarget = calories > target
    
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="text-xs font-medium text-gray-600">{day}</div>
        <div className="relative w-8 h-32 bg-gray-200 rounded-full">
          <div 
            className={`absolute bottom-0 w-full rounded-full transition-all duration-500 ${
              isOverTarget ? 'bg-red-400' : 'bg-primary-500'
            }`}
            style={{ height: `${Math.min(percentage, 100)}%` }}
          />
          {isOverTarget && (
            <div 
              className="absolute bottom-full w-full bg-red-300 rounded-full"
              style={{ height: `${percentage - 100}%` }}
            />
          )}
        </div>
        <div className="text-xs text-center">
          <div className={`font-semibold ${isOverTarget ? 'text-red-600' : 'text-gray-800'}`}>
            {calories}
          </div>
          <div className="text-gray-500">{target}</div>
        </div>
      </div>
    )
  }

  const StatCard = ({ icon, title, value, subtitle, color, trend }) => {
    const Icon = icon
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'transform rotate-180' : ''}`} />
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
            <p className="text-gray-600">Suivez vos progrès et votre historique</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Exporter</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Target}
            title="Calories moyennes"
            value="1,775"
            subtitle="7 derniers jours"
            color="bg-primary-500"
            trend={2}
          />
          <StatCard
            icon={TrendingUp}
            title="Jours d'objectif"
            value="5/7"
            subtitle="Cette semaine"
            color="bg-secondary-500"
            trend={12}
          />
          <StatCard
            icon={Award}
            title="Série actuelle"
            value="7 jours"
            subtitle="Record: 12 jours"
            color="bg-accent-500"
          />
          <StatCard
            icon={Calendar}
            title="Repas scannés"
            value="42"
            subtitle="Ce mois-ci"
            color="bg-bronze-500"
            trend={8}
          />
        </div>

        {/* Weekly Progress Chart */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Progression hebdomadaire</h3>
            <div className="flex space-x-2">
              {['week', 'month', '3months'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period === 'week' ? '7j' : period === 'month' ? '30j' : '3m'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between space-x-4 h-48 mb-4">
            {weeklyData.map((data, index) => (
              <CalorieBar
                key={index}
                day={data.day}
                calories={data.calories}
                target={data.target}
              />
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <span className="text-gray-600">Calories consommées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span className="text-gray-600">Objectif (1,800 cal)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <span className="text-gray-600">Dépassement</span>
            </div>
          </div>
        </div>

        {/* Meal History */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Historique des repas</h3>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Tous les repas</option>
                <option value="breakfast">Petit-déjeuner</option>
                <option value="lunch">Déjeuner</option>
                <option value="dinner">Dîner</option>
                <option value="snack">Collation</option>
              </select>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {mealHistory.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{meal.image}</div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <p className="font-medium text-gray-800">{meal.name}</p>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-lg">
                        {meal.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{meal.date}</span>
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{meal.calories} cal</p>
                  </div>
                  <button className="p-1 rounded hover:bg-gray-200">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button className="btn-secondary">Charger plus de repas</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 