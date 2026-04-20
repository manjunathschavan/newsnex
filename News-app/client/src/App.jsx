import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app w-full">
        <BrowserRouter>
          <Header />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<AllNews />} />
              <Route path="/top-headlines/:category" element={<TopHeadlines />} />
              <Route path="/country/:iso" element={<CountryNews />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;