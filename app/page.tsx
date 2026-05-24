import { getProducts } from "@/lib/woocommerce";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Sobre } from "@/components/Sobre";
import { Manifesto } from "@/components/Manifesto";
import { Shop } from "@/components/Shop";
import { LinhaSegredo } from "@/components/LinhaSegredo";
import { Studios } from "@/components/Studios";
import { Som } from "@/components/Som";
import { Arquivo } from "@/components/Arquivo";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { Anamnese } from "@/components/Anamnese";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";

/**
 * Página única (single-page) — todas as seções num só scroll.
 * Os produtos vêm de getProducts(): WooCommerce headless se configurado,
 * ou catálogo mock caso contrário.
 */
export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Marquee
          items={[
            "Unlock your mind",
            "Mushroom hunters",
            "Made in Brazil",
            "Since 2023",
            "Worldwide",
          ]}
        />
        <Sobre />
        <Manifesto />
        <LinhaSegredo />
        <Shop products={products} />
        <Studios />
        <Som />
<Arquivo />
      </main>

      <Footer />

      {/* camadas sobrepostas (modais e drawer) */}
      <AgeGate />
      <Anamnese />
      <CartDrawer />
      <ProductModal />
    </>
  );
}
