"use client";

import HomePages from "@/components/modules/home/HeroSection";
import Banner from "@/components/modules/home/HeroSection/Banner";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);

  return (
    <div>
      <Banner />
      {/* <HomePages /> */}
    </div>
  );
};

export default HomePage;
