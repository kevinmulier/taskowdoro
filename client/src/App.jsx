import Flowmodoro from './components/flowmodoro/Flowmodoro';
import Navbar from './components/nav/Navbar';
import Todo from './components/todo/Todo';

function App() {
  return (
    <>
      <Navbar />
      <div className="container flex flex-col max-w-xl gap-4 p-2 mx-auto">
        <Flowmodoro />
        <Todo />
      </div>
    </>
  );
}

export default App;
