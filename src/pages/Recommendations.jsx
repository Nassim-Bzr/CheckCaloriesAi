import { useState } from 'react'
import { Lightbulb, Heart, Zap, Clock, ChefHat, Target, TrendingUp, Star } from 'lucide-react'

function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState('nutrition')

  // Données mockées pour la démonstration
  const nutritionTips = [
    {
      id: 1,
      title: "Augmentez votre consommation de protéines",
      description: "Basé sur votre objectif de perte de poids, vous devriez consommer 25-30g de protéines par repas.",
      priority: "high",
      icon: Zap,
      action: "Ajoutez des œufs, du poulet ou des légumineuses à vos repas"
    },
    {
      id: 2,
      title: "Hydratation optimale",
      description: "Votre consommation d'eau pourrait être améliorée pour soutenir votre métabolisme.",
      priority: "medium",
      icon: Heart,
      action: "Visez 2,5L d'eau par jour, surtout avant les repas"
    },
    {
      id: 3,
      title: "Timing des glucides",
      description: "Consommez vos glucides principalement le matin et avant l'entraînement.",
      priority: "medium",
      icon: Clock,
      action: "Déplacez vos fruits et céréales vers le petit-déjeuner"
    }
  ]

  const recommendedRecipes = [
    {
      id: 1,
      name: "Bowl de quinoa aux légumes grillés",
      calories: 420,
      protein: 18,
      time: "25 min",
      difficulty: "Facile",
      rating: 4.8,
      image: "🥙",
      benefits: ["Riche en fibres", "Protéines complètes", "Anti-inflammatoire"]
    },
    {
      id: 2,
      name: "Saumon teriyaki avec brocolis",
      calories: 380,
      protein: 32,
      time: "20 min",
      difficulty: "Moyenne",
      rating: 4.9,
      image: "🐟",
      benefits: ["Oméga-3", "Haute protéine", "Faible en glucides"]
    },
    {
      id: 3,
      name: "Smoothie vert protéiné",
      calories: 245,
      protein: 22,
      time: "5 min",
      difficulty: "Très facile",
      rating: 4.6,
      image: "🥤",
      benefits: ["Détox", "Énergisant", "Antioxydants"]
    }
  ]

  const weeklyGoals = [
    {
      id: 1,
      title: "Augmenter les légumes",
      current: 4,
      target: 7,
      unit: "portions/jour",
      progress: 57,
      icon: "🥬"
    },
    {
      id: 2,
      title: "Réduire le sucre ajouté",
      current: 15,
      target: 10,
      unit: "g/jour",
      progress: 40,
      icon: "🍯"
    },
    {
      id: 3,
      title: "Équilibrer les repas",
      current: 5,
      target: 7,
      unit: "jours/semaine",
      progress: 71,
      icon: "⚖️"
    }
  ]

  const categories = [
    { id: 'nutrition', label: 'Nutrition', icon: Lightbulb },
    { id: 'recipes', label: 'Recettes', icon: ChefHat },
    { id: 'goals', label: 'Objectifs', icon: Target }
  ]

  const RecommendationCard = ({ tip }) => {
    const Icon = tip.icon
    const priorityColors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-orange-200 bg-orange-50',
      low: 'border-green-200 bg-green-50'
    }

    return (
      <div className={`card border-l-4 ${priorityColors[tip.priority]}`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-xl ${
            tip.priority === 'high' ? 'bg-red-100' : 
            tip.priority === 'medium' ? 'bg-orange-100' : 'bg-green-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              tip.priority === 'high' ? 'text-red-600' : 
              tip.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
            }`} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700">💡 Action recommandée:</p>
              <p className="text-sm text-gray-600 mt-1">{tip.action}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RecipeCard = ({ recipe }) => {
    return (
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{recipe.image}</div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">{recipe.rating}</span>
          </div>
        </div>
        
        <h4 className="font-semibold text-gray-800 mb-3">{recipe.name}</h4>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-800">{recipe.calories}</div>
            <div className="text-gray-500">cal</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-800">{recipe.protein}g</div>
            <div className="text-gray-500">protéines</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-800">{recipe.time}</div>
            <div className="text-gray-500">prep</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {recipe.benefits.map((benefit, index) => (
            <span key={index} className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full mr-2">
              {benefit}
            </span>
          ))}
        </div>

        <button className="btn-primary w-full text-sm">Voir la recette</button>
      </div>
    )
  }

  const GoalCard = ({ goal }) => {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{goal.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800">{goal.title}</h4>
              <p className="text-sm text-gray-600">{goal.current}/{goal.target} {goal.unit}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">{goal.progress}%</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cette semaine</span>
          <span className="text-gray-600 font-medium">
            {goal.current < goal.target ? 'En cours' : 'Objectif atteint! 🎉'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recommandations personnalisées
          </h2>
          <p className="text-gray-600">
            Conseils adaptés à votre profil et à vos objectifs de santé
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-2xl p-1 flex space-x-1">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white text-primary-600 shadow-card'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Nutrition Tips */}
        {selectedCategory === 'nutrition' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Conseils nutritionnels pour vous
              </h3>
              <p className="text-gray-600">
                Basés sur votre historique alimentaire et votre objectif de perte de poids
              </p>
            </div>
            
            {nutritionTips.map((tip) => (
              <RecommendationCard key={tip.id} tip={tip} />
            ))}

            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-500 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Votre progression</h4>
                  <p className="text-gray-600 text-sm">
                    Vous suivez bien vos recommandations! Continuez ainsi pour atteindre vos objectifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Recipes */}
        {selectedCategory === 'recipes' && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Recettes recommandées
              </h3>
              <p className="text-gray-600">
                Plats équilibrés adaptés à vos besoins nutritionnels
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="btn-secondary">Voir plus de recettes</button>
            </div>
          </div>
        )}

        {/* Weekly Goals */}
        {selectedCategory === 'goals' && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Objectifs de la semaine
              </h3>
              <p className="text-gray-600">
                Petits défis pour améliorer votre alimentation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {weeklyGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>

            {/* Achievement Section */}
            <div className="card bg-gradient-to-r from-accent-50 to-bronze-50 border border-accent-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Nouveau défi disponible!
                </h4>
                <p className="text-gray-600 mb-6">
                  Essayez 3 nouvelles recettes saines cette semaine et gagnez le badge "Explorateur culinaire"
                </p>
                <button className="btn-primary">Accepter le défi</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommendations 