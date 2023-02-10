import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])


  return (
    <Switch>
      <Route path='/login' component={LoginFormPage} />
      <h1>Home</h1>
    </Switch>
  );
}

export default App;
