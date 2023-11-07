import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us",
  description: "A Social Media company",
};

export default async function About() {
  return (
    <main>
      <h1>About</h1>
      <p>We are a social media company that wants to bring people together!</p>
    </main>
  );
}
