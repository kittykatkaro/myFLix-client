import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// import statement to indicate to bundle '.\index.scss' file
import './index.scss';

// main component
const MyFlixApp = () => {
	return <MainView />;
};

// finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// render app
root.render(<MyFlixApp />);
