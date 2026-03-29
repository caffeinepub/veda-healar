import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import VeduChatbot from "./components/VeduChatbot";
import WhatsAppButton from "./components/WhatsAppButton";
import About from "./pages/About";
import BookConsultation from "./pages/BookConsultation";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ServiceCategoryDetail from "./pages/ServiceCategoryDetail";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

// Layout component with Navbar and Footer
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <VeduChatbot />
    </div>
  );
}

// Create root route with layout
const rootRoute = createRootRoute({
  component: Layout,
});

// Create individual routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});

const servicesCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$categoryId",
  component: function ServicesCategoryPage() {
    const { categoryId } = servicesCategoryRoute.useParams();
    return <ServiceCategoryDetail categoryId={categoryId} />;
  },
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookConsultation,
});

const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: Testimonials,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  servicesCategoryRoute,
  bookRoute,
  testimonialsRoute,
  contactRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
