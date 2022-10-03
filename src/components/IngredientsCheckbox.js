import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../styles/components/IngredientsCheckbox.css';
import { useParams } from 'react-router-dom';
import { updateCheckedStates, saveRecipeProgress } from '../redux/actions';

function IngredientsCheckbox({ ingredientsValues, measuresValues }) {
  const { id } = useParams();
  const path = window.location.href.includes('meals') ? 'meals' : 'drinks';
  const dispatch = useDispatch();
  const storage = localStorage.getItem('inProgressRecipes');
  const states = {};
  ingredientsValues.forEach((_, index) => { states[index] = false; });
  if (storage !== null) {
    const storageValue = JSON.parse(localStorage.getItem('inProgressRecipes'))
    const hasKey = Object.keys(storageValue[path]).some((item) => item === id);
    console.log(hasKey)
    if (hasKey) storageValue[path][id].forEach((item) => { states[item] = true; });
  }
  console.log(states)
  const [state, setState] = useState(states);
  const [ingredients, setIngredients] = useState([]);
  const [keyLocal, setKeyLocal] = useState();
  console.log(state)

  const handleChecked = ({ target }) => {
    const { name, checked } = target;
    setState((prev) => ({
      ...prev,
      [name]: checked,
    }));

    const obj = { [target.id]: target.checked };
    dispatch(updateCheckedStates(obj));
    return target.checked;
  };

  useEffect(() => {
    setIngredients(Object.entries(state).filter((item) => item[1] === true)
      .map((item) => Number(item[0])));
  }, [state]);

  useEffect(() => {
    const key = { drinks: {}, meals: {} };
    // const keyPropertie = window.location.href.includes('meals') ? 'meals' : 'drinks';
    if (ingredients.length > 0) key[path][id] = ingredients;
    setKeyLocal(key);
    dispatch(saveRecipeProgress(key));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(keyLocal));
  }, [keyLocal]);

  return (
    <div>
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ index }
              className={ state[index] ? 'checkedInput' : 'false' }
            >
              <input
                type="checkbox"
                name={ index }
                onClick={ handleChecked }
              />
              { `${measuresValues[index]} ${item}` }
            </label>
          ))
        }
      </ul>
    </div>
  );
}

IngredientsCheckbox.propTypes = {
  ingredientsValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  measuresValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsCheckbox;
