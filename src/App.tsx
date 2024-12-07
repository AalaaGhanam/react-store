import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Loading from './components/Loader/Loading'
import AppRouter from './Router'
import store from './store'
import Container from './components/Container/Container'

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Loading></Loading>
            <BrowserRouter>
                <Container>
                    <AppRouter />
                </Container>
            </BrowserRouter>
        </Provider>
    )
}

export default App
