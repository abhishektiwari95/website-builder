import Image from "next/image";
import provider from "./Provider";
import Hero from "@/components/custom/Hero";
 

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
     <Hero />
         

    </h1>
  );
}
