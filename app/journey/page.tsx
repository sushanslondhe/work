import CandidateJourney from "@/components/candidate-journey"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Candidate Journey Tracker</h1>
      <CandidateJourney />
    </main>
  )
}

