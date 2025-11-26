import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularCourses from "@/components/PopularCourses";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Hero></Hero>
      <PopularCourses></PopularCourses>
      <Features></Features>
      <Testimonial></Testimonial>
    </div>
  );
}
