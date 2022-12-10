
import './App.css';
import Todo from './components/Todo/Todo';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="">
     <Todo></Todo>
     <Toaster/>
    </div>
  );
}

export default App;
