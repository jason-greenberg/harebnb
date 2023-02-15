import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import { restoreUser } from './store/session';
import AllSpots from './components/Spots/AllSpots';
import { getAllSpotsData, getAllUserOwnedSpotsData } from './store/spots';
import SpotDetails from './components/Spots/SpotDetails/SpotDetails';
import CreateSpot from './components/Spots/CreateSpot';
import ManageSpots from './components/Spots/ManageSpots';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
    dispatch(getAllSpotsData());
  }, [dispatch])


  return (
    <div className="page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={AllSpots} />
          <Route path='/spots/new' component={CreateSpot} />
          <Route path='/spots/current' component={ManageSpots} />
          <Route exact path='/spots/:spotId' component={SpotDetails} />
          <h1>Page Not Found</h1>
        </Switch>
      )}
    </div>
  );
}

export default App;
