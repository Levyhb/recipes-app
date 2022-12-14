import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMealDetail } from '../redux/actions';
import '../styles/components/Carrossel.css';
import BtnFavorite from './BtnFavorite';
import IngredientsCheckbox from './IngredientsCheckbox';
import CopyEndpoint from './CopyEndpoint';
import FinishBtn from './FinishBtn';
import BackButton from './BackButton';

export default function MealInProgess() {
  const [handleFinishButton, setHandleFinishButton] = useState(true);
  const { id } = useParams();
  const path = window.location.href.includes('meals') ? 'meals' : 'drinks';
  const url = `http://localhost:3000/${path}/${id}`;

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getMealDetail(data)));
  }, []);

  const meal = useSelector((state) => state.meals.mealDetail);
  let ingredientsValues = [];
  let measuresValues = [];
  if (meal) {
    const ingredientsKeys = Object.keys(meal).filter((item) => item
      .includes('Ingredient') && meal[item] !== null);
    ingredientsValues = ingredientsKeys.map((item) => meal[item])
      .filter((item) => item !== '');
    const measuresKeys = Object.keys(meal).filter((item) => item
      .includes('Measure') && meal[item] !== null);
    measuresValues = measuresKeys.map((item) => meal[item]);
  }
  // refatorar para 1 função
  return (
    <div>
      { meal && (
        <div className="details-container details-in-progress">
          <div className="img-title">
            <img
              src={ `${meal.strMealThumb}` }
              alt="meal"
              data-testid="recipe-photo"
            />
            <div className='buttons-recipe-details'>
              <div className="copy-favorite">
                <CopyEndpoint />
                <BtnFavorite recipe={ meal } type="meal" recipeId={ id } />
                <BackButton />
              </div>
            </div>
            <h1 data-testid="recipe-title">{meal.strMeal}</h1>
          </div>
          <h2
            data-testid="recipe-category"
            className="category-title"
          >
            {meal.strCategory}
          </h2>
          <IngredientsCheckbox
            measuresValues={ measuresValues }
            ingredientsValues={ ingredientsValues }
            setHandleFinishButton={ setHandleFinishButton }
          />
          <p data-testid="instructions">{meal.strInstructions}</p>
          <Link to="/done-recipes">
            {/* <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ handleFinishButton }
              className={ handleFinishButton ? 'disabled-button' : 'start-finish-btn' }
            >
              Finish Recipe
            </button> */}
            <FinishBtn
              recipe={ meal }
              type="meal"
              recipeId={ id }
              handleFinishButton={ handleFinishButton }
              url={ url }
            />
          </Link>
        </div>
      )}
    </div>
  );
}
