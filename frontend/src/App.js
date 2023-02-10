import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch])


  return (
    <Switch>
      <Route path='/login' component={LoginFormPage} />
      <h1>Page Not Found</h1>
    </Switch>
  );
}

export default App;
