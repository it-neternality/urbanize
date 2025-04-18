import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedProjects from "./components/FeaturedProjects";
import InnovationSection from "./components/InnovationSection";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            <Header />
            <HeroSection />
            <FeaturedProjects />
            <InnovationSection />
            <Footer />
        </div>
    );
}