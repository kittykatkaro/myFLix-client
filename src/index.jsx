import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import './index.scss';

// main component
const MyFlixApp = () => {
	return (
		<Container>
			<MainView />
		</Container>
	);
};

// finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// render app
root.render(<MyFlixApp />);
