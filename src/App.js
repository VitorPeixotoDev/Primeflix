import AppRoutes from "./app.routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <ToastContainer autoClose={3000}/>
      <AppRoutes/>
    </div>
  );
}

export default App;
