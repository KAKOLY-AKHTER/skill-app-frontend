const Features = () => {
  const features = [
    {
      title: "Expert Instructors",
      description:
        "Learn from industry experts who provide hands-on guidance and mentorship.",
      icon: "👨‍🏫",
    },
    {
      title: "Flexible Learning",
      description:
        "Study at your own pace with courses designed to fit your schedule.",
      icon: "⏰",
    },
    {
      title: "Hands-on Projects",
      description:
        "Build real-world projects to apply your skills and showcase your work.",
      icon: "🛠️",
    },
    {
      title: "Certificate of Completion",
      description:
        "Earn recognized certificates to demonstrate your learning achievements.",
      icon: "📜",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-500">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Learn in a way that suits you best and achieve your goals faster.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
