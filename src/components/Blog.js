import React, { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "The Benefits of Eating Healthy",
    excerpt: "Discover how a balanced diet can boost your energy and improve your well-being.",
    content: "Eating a variety of healthy foods helps your body function at its best...",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Why Exercise is Important",
    excerpt: "Regular exercise keeps your body strong and helps prevent diseases.",
    content: "Exercise strengthens your heart, improves circulation, and enhances mood...",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "How to Stay Hydrated",
    excerpt: "Drinking enough water is essential for good health and hydration.",
    content: "Water helps regulate body temperature, keeps joints lubricated, and prevents infections...",
    image: "https://images.unsplash.com/photo-1562158074-170611edfc56?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Mental Health and Fitness",
    excerpt: "Your mental well-being is just as important as physical health.",
    content: "Mindfulness, meditation, and regular physical activity improve mental resilience...",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Best Post-Workout Meals",
    excerpt: "Fuel your body the right way after an intense workout session.",
    content: "Protein-packed meals help with muscle recovery and energy replenishment...",
    image: "https://images.unsplash.com/photo-1570782700457-3f81e18c8c9b?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "The Science Behind Sleep",
    excerpt: "Good sleep is crucial for a healthy mind and body.",
    content: "Deep sleep improves memory, boosts immunity, and enhances focus...",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=250&fit=crop",
  },
  {
    id: 7,
    title: "Yoga for Stress Relief",
    excerpt: "Yoga can help calm your mind and relax your body.",
    content: "Practicing yoga daily reduces stress and improves flexibility...",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f13921349?w=400&h=250&fit=crop",
  },
  {
    id: 8,
    title: "Intermittent Fasting Benefits",
    excerpt: "Fasting can improve metabolism and help with weight management.",
    content: "Intermittent fasting helps regulate insulin levels and burn fat efficiently...",
    image: "https://images.unsplash.com/photo-1594745568485-46e38002b4ed?w=400&h=250&fit=crop",
  },
  {
    id: 9,
    title: "Running vs Walking: Which is Better?",
    excerpt: "Both have great health benefits, but which is better for you?",
    content: "Running burns more calories, while walking is gentler on joints...",
    image: "https://images.unsplash.com/photo-1532153977649-818bb62b81d0?w=400&h=250&fit=crop",
  },
  {
    id: 10,
    title: "Healthy Breakfast Ideas",
    excerpt: "Start your day with a nutritious and energy-boosting breakfast.",
    content: "A balanced breakfast includes proteins, fiber, and healthy fats...",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=250&fit=crop",
  },
  {
    id: 11,
    title: "How to Build Muscle Fast",
    excerpt: "Strength training and proper nutrition are key.",
    content: "To build muscle, focus on progressive overload and high-protein diets...",
    image: "https://images.unsplash.com/photo-1562771242-711df1f32e4b?w=400&h=250&fit=crop",
  },
  {
    id: 12,
    title: "The Importance of Outdoor Activities",
    excerpt: "Spending time outside can improve mental and physical health.",
    content: "Nature walks, hiking, and cycling reduce stress and improve mood...",
    image: "https://images.unsplash.com/photo-1517940310507-1c2b3c5cda7e?w=400&h=250&fit=crop",
  },
];

const Blog = () => {
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* Search Bar */}
      <div className="text-center mb-5">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-5">Blog Page</h1>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-30 text-white text-sm px-3 py-1 rounded-br-lg">
                  Health & Fitness
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                <button className="mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition duration-200">
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
