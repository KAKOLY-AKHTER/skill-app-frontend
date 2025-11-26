import Image from "next/image";

const Testimonial = () => {
  const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Software Engineer",
    message:
      "This platform gave me the confidence to build real projects and showcase my skills.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Moumita Sarker",
    role: "Data Scientist",
    message:
      "The structured learning path and hands-on practice helped me transition into data science smoothly.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Farzana Rahman",
    role: "UI/UX Designer",
    message:
      "I loved the design-focused courses. They improved my portfolio and boosted my career.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];


  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-500">
            What Our Learners Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Real feedback from our students who achieved their goals.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48} 
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{t.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
