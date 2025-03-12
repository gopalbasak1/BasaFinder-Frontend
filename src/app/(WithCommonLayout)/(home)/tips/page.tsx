"use client";

import { useState } from "react";
import TipsForm from "@/components/modules/tips/TipsForm";
import TipsList from "@/components/modules/tips/TipsList";

const TipsPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mx-auto p-6 bg-[#c9d6d6] rounded-3xl rounded-b-none">
      <h1 className="text-2xl font-bold mb-4">Tips & Advice</h1>
      <TipsList key={refresh.toString()} />
      <TipsForm onNewTip={() => setRefresh(!refresh)} />
    </div>
  );
};

export default TipsPage;
