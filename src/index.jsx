import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
// import statement to indicate to bundle '.\index.scss' file
import './index.scss';

// main component
const MyFlixApp = () => {
	return (
		<Container style={{ border: '1px solid red' }}>
			<MainView />
		</Container>
	);
};

// finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// render app
root.render(<MyFlixApp />);
