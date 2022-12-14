import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMealDetail } from '../redux/actions';
import ArrowCarousel from '../components/ArrowCarousel';
import CarouselCard from '../components/CarouselCard';
import '../styles/components/Carrossel.css';
import MealDetailsPage from '../components/MealDetailsPage';
import Loading from '../components/Loading';

const maxDrinksLength = 6;

export default function RecipesDetails() {
  const dispatch = useDispatch();
  const [recommendedDrinks, setRecommendedDrinks] = useState();
  const carouselDrinksRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getMealDetail(data)));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendedDrinks(data.drinks.slice(0, maxDrinksLength)));
  }, []);
  const meal = useSelector((state) => state.meals.mealDetail);

  return (
    <div>
      {
        meal && <MealDetailsPage />
      }
      <div className="details-carousel">
        {!recommendedDrinks ? (
          <Loading />
        ) : (
          <div className="related-recipes">
            <h2>Related Drinks</h2>
            <div className="carousel-container" ref={ carouselDrinksRef }>
              {recommendedDrinks.map((drink, index) => (
                <Link
                  key={ drink.idDrink }
                  to={ `/drinks/${drink.idDrink}` }
                >
                  <CarouselCard
                    title={ drink.strDrink }
                    thumb={ drink.strDrinkThumb }
                    index={ index }
                    key={ drink.idDrink }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        <ArrowCarousel carousel={ carouselDrinksRef } />
      </div>
    </div>
  );
}
