import Flowmodoro from './components/Flowmodoro';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container p-2 mx-auto">
        <Flowmodoro />
      </div>
    </>
  );
}

export default App;
