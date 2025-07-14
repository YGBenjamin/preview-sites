import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedMachines from "@/components/sections/FeaturedMachines";
import TrustSection from "@/components/sections/TrustSection";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedMachines />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
