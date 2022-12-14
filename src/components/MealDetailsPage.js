import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IngredientsList from './IngredientsList';
import BtnFavorite from './BtnFavorite';
import CopyEndpoint from './CopyEndpoint';
import '../styles/pages/Details.css';
import { RiArrowGoBackFill } from 'react-icons/ri';
import BackButton from './BackButton';

function MealDetailsPage() {
  const meal = useSelector((state) => state.meals.mealDetail);
  const ingredientsKeys = Object.keys(meal).filter((item) => item
    .includes('Ingredient') && meal[item] !== null);
  const ingredientsValues = ingredientsKeys.map((item) => meal[item])
    .filter((item) => item !== '');
  const measuresKeys = Object.keys(meal).filter((item) => item
    .includes('Measure') && meal[item] !== null);
  const measuresValues = measuresKeys.map((item) => meal[item]);

  const min = 32;
  const max = 44;
  const embled = meal.strYoutube.slice(min, max);

  const history = useHistory();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState(false);
  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setBtnDisabled(doneRecipes
      .every((e) => e.name !== meal.strMeal));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const { meals } = inProgressRecipes;
      setBtnText(Object.keys(meals)
        .some((e) => e === meal.idMeal));
    }
  }, []);

  return (
    <div className="details-container">
      <div className="img-title">
        <img
          src={ `${meal.strMealThumb}` }
          alt="meal"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <div className='buttons-recipe-details'>
          <div className="copy-favorite">
            <CopyEndpoint
              dataTestCopy="share-btn"
              pathRecived="meals"
              idRecived={ meal.idMeal }
            />
            <BtnFavorite
              recipe={ meal }
              type="meal"
              recipeId={ meal.idMeal }
              dataTest="favorite-btn"
            />
            <BackButton />
          </div>
        </div>
      </div>
      <h2 data-testid="recipe-category" className="category-title">{meal.strCategory}</h2>
      <IngredientsList
        measuresValues={ measuresValues }
        ingredientsValues={ ingredientsValues }
      />
      <p data-testid="instructions" className="instructions">{meal.strInstructions}</p>
      { meal && (
        <iframe
          className="preview-recipe"
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${embled}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-finish-btn"
        onClick={ () => history.push(`/meals/${meal.idMeal}/in-progress`) }
      >
        { btnText ? <span>Continue Recipe</span> : <span>Start Recipe</span> }
      </button>
    </div>
  );
}

export default MealDetailsPage;
