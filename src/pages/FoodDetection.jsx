import { useState, useRef } from 'react'
import { Camera, Upload, Scan, Check, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function FoodDetection({ onFoodsDetected, detectedFoods }) {
  const [image, setImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  // Données mockées pour la démonstration
  const mockDetectedFoods = [
    { id: 1, name: 'Salade verte', confidence: 95, selected: true, quantity: '100g' },
    { id: 2, name: 'Tomates cerises', confidence: 88, selected: true, quantity: '50g' },
    { id: 3, name: 'Poulet grillé', confidence: 92, selected: true, quantity: '150g' },
    { id: 4, name: 'Avocat', confidence: 85, selected: true, quantity: '1/2 pièce' },
    { id: 5, name: 'Vinaigrette', confidence: 78, selected: false, quantity: '1 cuillère' },
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      startScanning()
    }
  }

  const startScanning = () => {
    setIsScanning(true)
    setScanComplete(false)
    
    // Simulation du scan IA
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)
      onFoodsDetected(mockDetectedFoods)
    }, 3000)
  }

  const toggleFoodSelection = (foodId) => {
    const updatedFoods = detectedFoods.map(food => 
      food.id === foodId ? { ...food, selected: !food.selected } : food
    )
    onFoodsDetected(updatedFoods)
  }

  const updateQuantity = (foodId, newQuantity) => {
    const updatedFoods = detectedFoods.map(food => 
      food.id === foodId ? { ...food, quantity: newQuantity } : food
    )
    onFoodsDetected(updatedFoods)
  }

  const selectedFoods = detectedFoods.filter(food => food.selected)

  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Scanner votre repas
          </h2>
          <p className="text-gray-600">
            Prenez une photo ou uploadez une image pour analyser les aliments
          </p>
        </div>

        {/* Image Upload/Camera Section */}
        {!image && (
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Camera Button */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <Camera className="w-12 h-12 text-gray-400 mb-4" />
                <span className="font-medium text-gray-700">Prendre une photo</span>
                <span className="text-sm text-gray-500 mt-1">Utilisez votre appareil photo</span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <span className="font-medium text-gray-700">Uploader une image</span>
                <span className="text-sm text-gray-500 mt-1">JPG, PNG jusqu'à 10MB</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Image Preview & Scanning */}
        {image && (
          <div className="card mb-8">
            <div className="relative">
              <img 
                src={image} 
                alt="Repas à analyser" 
                className="w-full h-64 object-cover rounded-xl"
              />
              
              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                  <div className="bg-white p-6 rounded-2xl text-center">
                    <Scan className="w-8 h-8 text-primary-600 mx-auto mb-3 animate-pulse" />
                    <p className="font-medium text-gray-800">Analyse en cours...</p>
                    <p className="text-sm text-gray-500">L'IA détecte les aliments</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  setImage(null)
                  setScanComplete(false)
                  onFoodsDetected([])
                }}
                className="btn-secondary"
              >
                <X className="w-4 h-4 mr-2" />
                Recommencer
              </button>
              
              {!isScanning && !scanComplete && (
                <button onClick={startScanning} className="btn-primary">
                  <Scan className="w-4 h-4 mr-2" />
                  Analyser l'image
                </button>
              )}
            </div>
          </div>
        )}

        {/* Detected Foods */}
        {scanComplete && detectedFoods.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Aliments détectés
              </h3>
              <span className="text-sm text-gray-500">
                {selectedFoods.length}/{detectedFoods.length} sélectionnés
              </span>
            </div>

            <div className="space-y-4">
              {detectedFoods.map((food) => (
                <div 
                  key={food.id}
                  className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
                    food.selected 
                      ? 'border-primary-300 bg-primary-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleFoodSelection(food.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        food.selected
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {food.selected && <Check className="w-3 h-3 text-white" />}
                    </button>
                    
                    <div>
                      <p className="font-medium text-gray-800">{food.name}</p>
                      <p className="text-sm text-gray-500">
                        Confiance: {food.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={food.quantity}
                      onChange={(e) => updateQuantity(food.id, e.target.value)}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={!food.selected}
                    />
                  </div>
                </div>
              ))}
            </div>

            {selectedFoods.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link to="/summary">
                  <button className="btn-primary w-full flex items-center justify-center">
                    <span>Analyser la nutrition</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
          <h4 className="font-semibold text-gray-800 mb-3">💡 Conseils pour une meilleure détection</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Prenez la photo sous un bon éclairage</li>
            <li>• Assurez-vous que tous les aliments sont visibles</li>
            <li>• Évitez les ombres importantes sur le repas</li>
            <li>• Tenez l'appareil stable lors de la prise de vue</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FoodDetection 