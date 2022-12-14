import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

let recipeMockUp = {
  id: '',
  type: '',
  nationality: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
};

function BtnFavorite({ recipe, type, recipeId, dataTest, childToParent }) {
  const {
    strCategory,
    strArea,
    strAlcoholic,
    strMealThumb,
    strMeal,
    strDrink,
    strDrinkThumb,
  } = recipe;

  recipeMockUp = type === 'meal'
    ? {
      id: recipeId,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }
    : {
      id: recipeId,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
  const getLocal = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [isFav, setAsFav] = useState(false);
  const findByIdArray = (array) => array.find(({ id }) => id === recipeId);
  useEffect(() => {
    const setIfDone = async () => {
      const favRecps = getLocal();
      if (favRecps && findByIdArray(favRecps)) {
        setAsFav(true);
      }
    };
    setIfDone();
  }, []);

  const saveAsFav = (favRecps) => {
    if (favRecps) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favRecps, recipeMockUp]),
      );
    } else localStorage.setItem('favoriteRecipes', JSON.stringify([recipeMockUp]));
    setAsFav(true);
  };

  const removeFromFav = (favRecps) => {
    if (favRecps) {
      const newFavs = favRecps.filter(({ id }) => id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...newFavs]));
      childToParent([...newFavs]);
    }
    setAsFav(false);
  };

  const changeFav = (event) => {
    event.preventDefault();
    const favRecps = getLocal();
    if (isFav) removeFromFav(favRecps);
    else saveAsFav(favRecps);
  };

  return (
    <button
      type="submit"
      onClick={ (event) => changeFav(event) }
      className="favorite btn-copy-favorite"
    >
      {isFav ? <MdFavorite /> : <MdFavoriteBorder /> }
    </button>
  );
}

BtnFavorite.propTypes = {
  dataTest: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  recipeId: PropTypes.string.isRequired,
  childToParent: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default BtnFavorite;
