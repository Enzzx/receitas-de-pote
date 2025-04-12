import { useState } from 'react';
import { News, RecipeData } from '../models';

export default function SearchResultContainer(props: {  recipes: RecipeData[], news: News[]}) {
    const { recipes, news } = props
  const [activeTab, setActiveTab] = useState<'recipes' | 'news'>('recipes');


  return (
    <div className="content-container">
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
        <button
          className={`toggle-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'recipes' && (
          <div className="list-container">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe.Id} className="list-item recipe-item">
                  <img 
                    src={recipe.Image || "/api/placeholder/150/150"} 
                    alt={recipe.Title} 
                    className="item-image"
                  />
                  <div className="item-content">
                    <h3 className="item-title">{recipe.Title}</h3>
                    <p className="item-description">{recipe.Description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No recipes available</div>
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="list-container">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item.Id} className="list-item news-item">
                  <img 
                    src={item.Image || "/api/placeholder/150/150"} 
                    alt={item.Title} 
                    className="item-image"
                  />
                  <div className="item-content">
                    <div className="item-meta">
                      <span className="topic-tag">{item.Topic}</span>
                      <span className="publication-name">{item.Publication}</span>
                    </div>
                    <h3 className="item-title">{item.Title}</h3>
                    <p className="item-description">{item.Description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No news articles available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}