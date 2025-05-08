
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wardrobe from "./pages/Wardrobe";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import AddItem from "./pages/AddItem";
import NotFound from "./pages/NotFound";
import OutfitGenerator from "./pages/OutfitGenerator";
import Marketplace from "./pages/Marketplace";
import OutfitPost from "./pages/OutfitPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ItemDetail from "./pages/ItemDetail";
import Chat from "./pages/Chat";
import ChatOverview from "./pages/ChatOverview";
import Entertainment from "./pages/Entertainment";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/outfit-generator" element={<OutfitGenerator />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/post/:postId" element={<OutfitPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/chat-overview" element={<ChatOverview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
