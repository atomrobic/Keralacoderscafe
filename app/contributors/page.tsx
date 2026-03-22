import type { Metadata } from "next";
import ContributorsDirectory from "../components/ContributorsDirectory";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "All Contributors",
  description:
    "Meet every public contributor building Kerala Coders Cafe, with a clean live contributors directory.",
  alternates: {
    canonical: "/contributors",
  },
};

export default function ContributorsPage() {
  return (
    <main className="relative z-10 overflow-x-clip bg-kcc-bg pb-24 text-kcc-text md:pb-0">
      <NavBar />
      <ContributorsDirectory />
    </main>
  );
}
