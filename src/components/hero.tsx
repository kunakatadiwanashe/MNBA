'use client';
import { motion } from 'framer-motion';

export default function HomePage() {
  const articles = [
    {
      id: 1,
      title: "Basketball club memberships and benefits explained",
      date: "Nov 1, 2025",
      category: "GAMES",
      video: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fvicfallstelevivi%2Fvideos%2F2085256868547932%2F&show_text=true&width=560&t=0" ,
      
      excerpt:
        "Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in.",
    },
    {
      id: 2,
      title: "Sustainability practices in professional basketball clubs",
      date: "Oct 10, 2025",
      category: "GAMES",
      video: "https://www.youtube.com/embed/64_-dnTKD38",
    },
    {
      id: 3,
      title: "How basketball clubs scout new talent",
      date: "Oct 10, 2025",
      category: "GAMES",
      video: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fvicfallstelevivi%2Fvideos%2F24451971511097073%2F&show_text=false&width=560&t=0",
    },
    {
      id: 4,
      title: "Top ten professional basketball clubs in the world",
      date: "Oct 20, 2025",
      category: "GAMES",
      video: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fvicfallstelevivi%2Fvideos%2F24451971511097073%2F&show_text=false&width=560&t=0",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Trending Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <p className="uppercase text-sm text-gray-500 font-semibold tracking-wide">
          Our Articles
        </p>
        <h2 className="text-4xl font-bold mt-2 mb-8">Trending Now</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Article with YouTube Video */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src={articles[0].video}
                title={articles[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <span className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                {articles[0].category}
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start gap-4">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-gray-900">
                  {articles[0].date.split(" ")[1]}
                </p>
                <p className="text-sm text-gray-500 uppercase">
                  {articles[0].date.split(" ")[0]}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 hover:text-orange-600 cursor-pointer">
                  {articles[0].title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{articles[0].excerpt}</p>
                <p className="text-xs text-gray-400">1 Like · 0 Comments</p>
              </div>
            </div>
          </motion.div>

          {/* Side Articles with Videos */}
          <div className="flex flex-col gap-6">
            {articles.slice(1).map((a) => (
              <motion.div
                key={a.id}
                className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full sm:w-48 h-48 sm:h-32 rounded-md overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={a.video}
                    title={a.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">
                    {a.category} • {a.date}
                  </p>
                  <h4 className="font-semibold hover:text-orange-600 cursor-pointer text-sm mt-1">
                    {a.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
