import { useState } from 'react';
import { News, RecipeData } from '../models';

export default function SearchResultContainer(props: {  recipes: RecipeData[], news: News[]}) {
    const { recipes, news } = props
  const [activeTab, setActiveTab] = useState<'recipes' | 'news'>('recipes');


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Toggle Buttons */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'recipes'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'news'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.Id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={recipe.Image || "/api/placeholder/400/250"} 
                  alt={recipe.Title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{recipe.Title}</h3>
                  <p className="text-gray-600 text-sm">{recipe.Description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.Id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={item.Image || "/api/placeholder/300/200"} 
                  alt={item.Title} 
                  className="w-full md:w-48 h-48 object-cover"
                />
                <div className="p-4 flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{item.Topic}</span>
                    <span className="text-gray-500 text-xs ml-2">{item.Publication}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.Title}</h3>
                  <p className="text-gray-600 text-sm">{item.Description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty States */}
        {activeTab === 'recipes' && recipes.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No recipes available</p>
          </div>
        )}

        {activeTab === 'news' && news.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No news articles available</p>
          </div>
        )}
      </div>
    </div>
  );
}