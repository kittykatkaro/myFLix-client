import { createRoot } from 'react-dom/client';
// import statement to indicate to bundle '.\index.scss' file
import './index.scss';

// main component
const MyFlixApp = () => {
	return (
		<div className="my-flix-app">
			<div>Good Morning</div>
		</div>
	);
};

// finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// render app
root.render(<MyFlixApp />);
