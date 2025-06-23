import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GenerateRecipe from './pages/GenerateRecipe';
import RecipeDetails from "./pages/RecipeDetails";
import ChatBot from "./pages/ChatBot";
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/generate' element={<GenerateRecipe />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
          <Route path='/chat' element={<ChatBot />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
