import { useLocation } from 'react-router-dom';
import RecipesList from './RecipesList';

function RecipesListWrapper(props) {
  const location = useLocation();
  return <RecipesList {...props} location={location} />;
}

export default RecipesListWrapper;
