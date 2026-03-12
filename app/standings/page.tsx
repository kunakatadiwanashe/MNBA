import StandingsTable from "@/components/StandingsTable";

export default function Standings() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-display font-bold mb-2">League Standings</h1>
      <p className="text-muted-foreground mb-8">Current standings for the 2026 MBA season.</p>
      <div className="glass-card rounded-lg p-6">
        <StandingsTable />
      </div>
    </div>
  );
}
