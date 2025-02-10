import React, { useState } from "react";
import { BarChart, ChevronDown } from "lucide-react";

// Sample data - in a real app this would come from your backend
const sampleMatchingScores = [
  { jobTitle: "Senior Frontend Developer", score: 85 },
  { jobTitle: "Full Stack Engineer", score: 78 },
  { jobTitle: "React Developer", score: 92 },
  { jobTitle: "UI Engineer", score: 75 },
  { jobTitle: "JavaScript Developer", score: 88 },
];

function App() {
  const [selectedCandidate] = useState("John Doe"); // In a real app, this would be dynamic

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Match Analysis
              </h1>
              <p className="text-gray-600 mt-1">
                JD Matching Distribution for {selectedCandidate}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            {sampleMatchingScores.map((item) => (
              <div key={item.jobTitle} className="relative">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 w-48">
                    {item.jobTitle}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 ml-2">
                    {item.score}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: getScoreColor(item.score),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t">
            <StatCard
              title="Average Match"
              value={`${calculateAverage(sampleMatchingScores)}%`}
              icon={<BarChart className="h-5 w-5 text-blue-600" />}
            />
            <StatCard
              title="Best Match"
              value={`${Math.max(
                ...sampleMatchingScores.map((s) => s.score)
              )}%`}
              icon={<BarChart className="h-5 w-5 text-green-600" />}
            />
            <StatCard
              title="Total JDs"
              value={sampleMatchingScores.length}
              icon={<BarChart className="h-5 w-5 text-purple-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function calculateAverage(scores) {
  const avg = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
  return Math.round(avg);
}

function getScoreColor(score) {
  if (score >= 90) return "#22c55e"; // green-500
  if (score >= 75) return "#3b82f6"; // blue-500
  if (score >= 60) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

export default App;
