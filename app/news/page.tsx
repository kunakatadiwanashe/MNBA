import { news } from "@/data/mockData";

export default function News() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-display font-bold mb-2">News & Updates</h1>
      <p className="text-muted-foreground mb-8">Latest news from the MartNorth Basketball Association.</p>
      <div className="space-y-4">
        {news.map(article => (
          <div key={article.id} className="glass-card rounded-lg p-6 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
              <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>{article.author}</span>
            </div>
            <h2 className="font-display text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-muted-foreground">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
