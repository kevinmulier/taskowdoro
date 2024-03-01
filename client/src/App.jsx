import Flowmodoro from './components/flowmodoro/Flowmodoro';
import Footer from './components/nav/Footer';
import Navbar from './components/nav/Navbar';
import Todo from './components/todo/Todo';

function App() {
  return (
    <>
      <Navbar />
      <div className="container flex justify-center gap-4 p-2 mx-auto max-md:flex-col max-w-7xl">
        <Flowmodoro />
        <Todo />
      </div>
      <Footer />
    </>
  );
}

export default App;
