import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "@fontsource-variable/orbitron/index.css";
import "./index.css";

import { Home } from "@/pages/home";
import { NewGame } from "@/pages/new-game";
import { Game } from "@/pages/game";
import { ThemeProvider } from "@/providers/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
