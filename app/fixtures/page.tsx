"use client"

import { useState } from "react";
import FixtureCard from "@/components/FixtureCard";
import { fixtures } from "@/data/mockData";

export default function Fixtures() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const filtered = filter === "all" ? fixtures : fixtures.filter(f => f.status === filter);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-display font-bold mb-2">Fixtures & Results</h1>
      <p className="text-muted-foreground mb-8">Full schedule and match results for the 2026 MBA season.</p>

      <div className="flex gap-2 mb-8">
        {(["all", "upcoming", "completed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f === "all" ? "All Games" : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(f => <FixtureCard key={f.id} fixture={f} />)}
      </div>
    </div>
  );
}
