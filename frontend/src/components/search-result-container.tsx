import { useState } from 'react';
import { News, RecipeData } from '../models';
import { Link } from 'react-router-dom';

export default function SearchResultContainer(props: { recipes: RecipeData[], news: News[] }) {
  const { recipes = [], news = [] } = props
  const [activeTab, setActiveTab] = useState<'recipes' | 'news'>('recipes');

  function reticence(str: string): string {
    if (str.length <= 140) return str

    str = str.slice(0, 140)
    while(/[^a-zA-Z0-9]$/.test(str)) {
        str = str.slice(0, -1)
    }

    return str + "..."
}

  return (
    <div className="content-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}>Recipes</button>
        <button
          className={`toggle-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}>News</button>
      </div>

      <div className="content-area">
        {activeTab === 'recipes' && (
          <div className="list-container">
            {recipes != null && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Link to={'pages/recipes/'+recipe.Slug} key={recipe.Id} className="list-item recipe-item">
                  <img
                    src={recipe.Image}
                    alt={recipe.Title}
                    className="item-image"
                  />
                  <div className="item-content">
                    <h3 className="item-title">{recipe.Title}</h3>
                    <p className="item-description">{reticence(recipe.Description)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">Não há receitas correspondentes</div>
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="list-container">
            {news != null && news.length > 0 ? (
              news.map((item) => (
                <div key={item.Id} className="list-item news-item">
                  <img
                    src={item.Image}
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
              <div className="empty-state">Não há notícias correspondentes</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}