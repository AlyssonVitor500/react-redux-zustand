import { Player } from './pages/Player'

/*
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'

Não é mais necessário wrap toda a aplicação com zustand
<ReduxProvider store={store}> 
...
</ReduxProvider>
*/

export function App() {
  return (
    <div>
      <Player />
    </div>
  )
}
