import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import TopBar from '@/components/TopBar'
import HomePage from '@/pages/HomePage'

export function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Switch>
        <Route path="/">
          <Route exact path="/" component={HomePage} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
