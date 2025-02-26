import React from "react";

const blogs = [
  {
    id: 1,
    title: "The Benefits of Eating Healthy",
    excerpt: "Discover how a balanced diet can boost your energy and improve your well-being.",
    content: "Eating a variety of healthy foods helps your body function at its best...",
    image: "https://source.unsplash.com/400x250/?healthy,food",
  },
  {
    id: 2,
    title: "Why Exercise is Important",
    excerpt: "Regular exercise keeps your body strong and helps prevent diseases.",
    content: "Exercise strengthens your heart, improves circulation, and enhances mood...",
    image: "https://source.unsplash.com/400x250/?exercise,fitness",
  },
  {
    id: 3,
    title: "How to Stay Hydrated",
    excerpt: "Drinking enough water is essential for good health and hydration.",
    content: "Water helps regulate body temperature, keeps joints lubricated, and prevents infections...",
    image: "https://source.unsplash.com/400x250/?water,hydration",
  },
  {
    id: 4,
    title: "Mental Health and Fitness",
    excerpt: "Your mental well-being is just as important as physical health.",
    content: "Mindfulness, meditation, and regular physical activity improve mental resilience...",
    image: "https://source.unsplash.com/400x250/?mental,health",
  },
  {
    id: 5,
    title: "Best Post-Workout Meals",
    excerpt: "Fuel your body the right way after an intense workout session.",
    content: "Protein-packed meals help with muscle recovery and energy replenishment...",
    image: "https://source.unsplash.com/400x250/?food,protein",
  },
  {
    id: 6,
    title: "The Science Behind Sleep",
    excerpt: "Good sleep is crucial for a healthy mind and body.",
    content: "Deep sleep improves memory, boosts immunity, and enhances focus...",
    image: "https://source.unsplash.com/400x250/?sleep,rest",
  },
  {
    id: 7,
    title: "Yoga for Stress Relief",
    excerpt: "Yoga can help calm your mind and relax your body.",
    content: "Practicing yoga daily reduces stress and improves flexibility...",
    image: "https://source.unsplash.com/400x250/?yoga,meditation",
  },
  {
    id: 8,
    title: "Intermittent Fasting Benefits",
    excerpt: "Fasting can improve metabolism and help with weight management.",
    content: "Intermittent fasting helps regulate insulin levels and burn fat efficiently...",
    image: "https://source.unsplash.com/400x250/?fasting,health",
  },
  {
    id: 9,
    title: "Running vs Walking: Which is Better?",
    excerpt: "Both have great health benefits, but which is better for you?",
    content: "Running burns more calories, while walking is gentler on joints...",
    image: "https://source.unsplash.com/400x250/?running,walking",
  },
  {
    id: 10,
    title: "Healthy Breakfast Ideas",
    excerpt: "Start your day with a nutritious and energy-boosting breakfast.",
    content: "A balanced breakfast includes proteins, fiber, and healthy fats...",
    image: "https://source.unsplash.com/400x250/?breakfast,healthy",
  },
  {
    id: 11,
    title: "How to Build Muscle Fast",
    excerpt: "Strength training and proper nutrition are key.",
    content: "To build muscle, focus on progressive overload and high-protein diets...",
    image: "https://source.unsplash.com/400x250/?gym,muscle",
  },
  {
    id: 12,
    title: "The Importance of Outdoor Activities",
    excerpt: "Spending time outside can improve mental and physical health.",
    content: "Nature walks, hiking, and cycling reduce stress and improve mood...",
    image: "https://source.unsplash.com/400x250/?nature,hiking",
  },
];

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center my-5">Blog Page</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto max-h-[85vh] p-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.excerpt}</p>
              <button className="mt-3 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
