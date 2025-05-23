import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Save, Share2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function NutritionalSummary({ foods, onNutritionalData }) {
  const [nutritionData, setNutritionData] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (foods && foods.length > 0) {
      calculateNutrition()
    }
  }, [foods])

  const calculateNutrition = () => {
    // Données nutritionnelles mockées pour la démonstration
    const mockNutrition = {
      totalCalories: 485,
      protein: 32,
      carbs: 18,
      fat: 28,
      fiber: 12,
      sugar: 8,
      sodium: 320,
      potassium: 720,
      foodDetails: [
        { name: 'Salade verte', calories: 15, protein: 1, carbs: 3, fat: 0 },
        { name: 'Tomates cerises', calories: 20, protein: 1, carbs: 4, fat: 0 },
        { name: 'Poulet grillé', calories: 250, protein: 25, carbs: 0, fat: 15 },
        { name: 'Avocat', calories: 200, protein: 5, carbs: 11, fat: 13 },
      ]
    }
    
    setNutritionData(mockNutrition)
    onNutritionalData(mockNutrition)
  }

  const MacroChart = ({ label, value, max, color, unit = 'g' }) => {
    const percentage = Math.min((value / max) * 100, 100)
    
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 mr-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm text-gray-600">{value}{unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  const CalorieCircle = ({ calories, maxCalories = 600 }) => {
    const percentage = Math.min((calories / maxCalories) * 100, 100)
    const strokeDasharray = 2 * Math.PI * 45
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#22c55e"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{calories}</span>
          <span className="text-sm text-gray-500">calories</span>
        </div>
      </div>
    )
  }

  if (!nutritionData) {
    return (
      <div className="min-h-screen pt-20 px-4 pb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">Calcul des informations nutritionnelles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/detection">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Résumé nutritionnel</h2>
              <p className="text-gray-600">Analyse de votre repas</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Partager</span>
            </button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Calories Circle */}
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Total des calories</h3>
            <CalorieCircle calories={nutritionData.totalCalories} />
            <p className="text-sm text-gray-500 mt-4">
              Repas modéré pour votre objectif
            </p>
          </div>

          {/* Macronutrients */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Macronutriments</h3>
            <MacroChart 
              label="Protéines" 
              value={nutritionData.protein} 
              max={50} 
              color="bg-blue-500" 
            />
            <MacroChart 
              label="Glucides" 
              value={nutritionData.carbs} 
              max={60} 
              color="bg-orange-500" 
            />
            <MacroChart 
              label="Lipides" 
              value={nutritionData.fat} 
              max={40} 
              color="bg-purple-500" 
            />
          </div>
        </div>

        {/* Macro Distribution */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Répartition des macronutriments</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{nutritionData.protein}g</div>
              <div className="text-sm text-blue-800 font-medium">Protéines</div>
              <div className="text-xs text-blue-600">26% des calories</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{nutritionData.carbs}g</div>
              <div className="text-sm text-orange-800 font-medium">Glucides</div>
              <div className="text-xs text-orange-600">15% des calories</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{nutritionData.fat}g</div>
              <div className="text-sm text-purple-800 font-medium">Lipides</div>
              <div className="text-xs text-purple-600">52% des calories</div>
            </div>
          </div>
        </div>

        {/* Additional Nutrients */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Autres nutriments</h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {showDetails ? 'Masquer' : 'Voir plus'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{nutritionData.fiber}g</div>
              <div className="text-sm text-gray-600">Fibres</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{nutritionData.sugar}g</div>
              <div className="text-sm text-gray-600">Sucres</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{nutritionData.sodium}mg</div>
              <div className="text-sm text-gray-600">Sodium</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{nutritionData.potassium}mg</div>
              <div className="text-sm text-gray-600">Potassium</div>
            </div>
          </div>
        </div>

        {/* Food Details */}
        {showDetails && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Détail par aliment</h3>
            <div className="space-y-4">
              {nutritionData.foodDetails.map((food, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{food.name}</p>
                    <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                      <span>Protéines: {food.protein}g</span>
                      <span>Glucides: {food.carbs}g</span>
                      <span>Lipides: {food.fat}g</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{food.calories}</p>
                    <p className="text-sm text-gray-500">calories</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer le repas
          </button>
          
          <button 
            onClick={() => navigate('/detection')}
            className="btn-secondary flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un aliment
          </button>
        </div>
      </div>
    </div>
  )
}

export default NutritionalSummary 