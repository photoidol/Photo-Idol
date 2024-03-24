
import { useEffect } from "react";
import { Explore } from "../../components/hero/Explore";
import { Hero } from "../../components/hero/Hero";
import { scrollToTop } from "../../utils/scrollToTop";

export const HomeScreen = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
      <Hero />
      <Explore />
    </>
  );
};
