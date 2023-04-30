import {App} from './App'
import {createRoot} from 'react-dom/client'


test('renders without crashing', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    // @ts-ignore
    root.render(<App tab="home"/>)
    root.unmount()
})