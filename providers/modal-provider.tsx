"use client";

import { useEffect, useState } from "react";

import DatabaseModal from "@/components/modals/database-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DatabaseModal />
    </>
  );
};
