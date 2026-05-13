import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import BookmarksPage from "./components/BookmarksPage";
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app w-full">
          <BrowserRouter>
            <Header />
            <div style={{ paddingTop: '96px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/all-news" element={<AllNews />} />
                <Route path="/top-headlines/:category" element={<TopHeadlines />} />
                <Route path="/country/:iso" element={<CountryNews />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
