import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path='/login' component={LoginFormPage} />
      <h1>Page Not Found</h1>
    </Switch>
  );
}

export default App;
