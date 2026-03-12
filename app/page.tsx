import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Users, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import StandingsTable from "@/components/StandingsTable";
import FixtureCard from "@/components/FixtureCard";
import { fixtures, news, teams } from "@/data/mockData";

export default function Index() {
  const upcomingFixtures = fixtures.filter(f => f.status === "upcoming").slice(0, 3);
  const recentResults = fixtures.filter(f => f.status === "completed").slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-end overflow-hidden">
        <Image
          src={heroBg}
          alt="Basketball arena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative z-10 text-left container">
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6 text-xs text-primary font-medium">
            <Trophy className="h-3.5 w-3.5" /> 2026 Season Now Live
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-4">
            <span className="">Mart North</span><br />
            Basketball Association
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            Where champions are made. Follow every game, every score, every moment.
          </p>
          <div className="flex items-left justify-start gap-4 flex-wrap">
            <Link href="/fixtures" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm hover:bg-primary/90 transition-colors">
              View Schedule <Calendar className="h-4 w-4" />
            </Link>
            <Link href="/teams" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm hover:bg-secondary transition-colors">
              Explore Teams <Users className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Upcoming Games</h2>
          <Link href="/fixtures" className="text-sm text-primary flex items-center gap-1 hover:underline">View All <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingFixtures.map(f => <FixtureCard key={f.id} fixture={f} />)}
        </div>
      </section>

      {/* Recent Results & Standings */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Recent Results</h2>
              <Link href="/fixtures" className="text-sm text-primary flex items-center gap-1 hover:underline">All Results <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="space-y-4">
              {recentResults.map(f => <FixtureCard key={f.id} fixture={f} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Standings</h2>
              <Link href="/standings" className="text-sm text-primary flex items-center gap-1 hover:underline">Full Table <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="glass-card rounded-lg p-4">
              <StandingsTable compact />
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Latest News</h2>
          <Link href="/news" className="text-sm text-primary flex items-center gap-1 hover:underline">All News <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {news.map(article => (
            <div key={article.id} className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all group">
              <p className="text-xs text-muted-foreground mb-2">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              <h3 className="font-display text-base font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teams Ribbon */}
      {/* <section className="container pb-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">Our Teams</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {teams.map(team => (
            <Link key={team.id} href={`/teams/${team.id}`} className="glass-card rounded-lg p-5 text-center hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg" style={{ backgroundColor: team.color, color: "#fff" }}>
                <Image src={team.logo}
                  alt={`${team.name} logo`}
                  width={24}
                  height={24}
                  className="object-contain" />
              </div>
              <p className="font-display text-sm font-semibold group-hover:text-primary transition-colors">{team.name}</p>
            </Link>
          ))}
        </div>
      </section> */}
    </>
  );
}
