"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("fb11a59e-c7c4-4658-8deb-b0eb701c070b");
  }, []);
  return null;
};
