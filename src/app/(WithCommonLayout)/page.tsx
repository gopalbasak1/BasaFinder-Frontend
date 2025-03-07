"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
