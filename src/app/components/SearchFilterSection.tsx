import { motion } from "motion/react";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useInView } from "./hooks/useInView";
import { useState, useEffect } from "react";
import { programsAPI } from "../services/api";
import { toast } from "sonner";

interface Program {
  id: number;
  name: string;
  description: string;
  goal: string;
  level: string;
  duration: string;
  price: number;
}

export function SearchFilterSection() {
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Filter options
  const goals = ["Weight Loss", "Muscle Gain", "General Fitness", "Flexibility", "Strength"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["2 months", "3 months", "6 months", "12+ months"];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGoal(null);
    setSelectedLevel(null);
    setSelectedDuration(null);
    setPrograms([]);
    setShowResults(false);
  };

  const hasActiveFilters = selectedGoal || selectedLevel || selectedDuration || searchQuery;

  const handleSearch = async () => {
    if (!hasActiveFilters) {
      toast.info("Please enter a search term or select filters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await programsAPI.search({
        query: searchQuery || undefined,
        goal: selectedGoal || undefined,
        level: selectedLevel || undefined,
        duration: selectedDuration || undefined,
      });

      if (response.success) {
        setPrograms(response.data);
        setShowResults(true);
        toast.success(`Found ${response.data.length} program(s)`);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error('Failed to search programs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="search" className="py-20 bg-[#292113]" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#f1f0eb] mb-4">
            Find Your Perfect <span className="text-[#d5a310]">Program</span>
          </h2>
          <p className="text-[#f1f0eb]/70 text-lg max-w-2xl mx-auto">
            Search and filter our programs to find the one that matches your goals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d5a310]/50" />
            <Input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-4 h-14 bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310] text-lg"
            />
          </div>

          {/* Filter Section */}
          <div className="bg-[#040304]/40 rounded-2xl p-6 border border-[#d5a310]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#d5a310]" />
                <h3 className="text-[#f1f0eb] font-semibold">Filters</h3>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-[#d5a310] hover:text-[#d5a310]/80 hover:bg-[#d5a310]/10"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Goal Filter */}
            <div className="mb-6">
              <label className="text-[#f1f0eb] text-sm mb-3 block">Fitness Goal</label>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setSelectedGoal(selectedGoal === goal ? null : goal)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedGoal === goal
                        ? "bg-[#d5a310] text-[#040304] border-[#d5a310]"
                        : "bg-[#292113] text-[#f1f0eb] border-[#d5a310]/30 hover:border-[#d5a310]/50"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="mb-6">
              <label className="text-[#f1f0eb] text-sm mb-3 block">Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedLevel === level
                        ? "bg-[#d5a310] text-[#040304] border-[#d5a310]"
                        : "bg-[#292113] text-[#f1f0eb] border-[#d5a310]/30 hover:border-[#d5a310]/50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="text-[#f1f0eb] text-sm mb-3 block">Program Duration</label>
              <div className="flex flex-wrap gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() =>
                      setSelectedDuration(selectedDuration === duration ? null : duration)
                    }
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedDuration === duration
                        ? "bg-[#d5a310] text-[#040304] border-[#d5a310]"
                        : "bg-[#292113] text-[#f1f0eb] border-[#d5a310]/30 hover:border-[#d5a310]/50"
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8 text-center">
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#d5a310] text-[#040304] hover:bg-[#d5a310]/90 px-8 py-6 text-lg shadow-lg shadow-[#d5a310]/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Programs'
              )}
            </Button>
          </div>

          {/* Results Section */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-[#f1f0eb] mb-6">
                Search Results ({programs.length})
              </h3>
              
              {programs.length === 0 ? (
                <div className="bg-[#040304]/40 rounded-xl p-8 text-center border border-[#d5a310]/20">
                  <p className="text-[#f1f0eb]/70 text-lg">
                    No programs found matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#040304]/60 rounded-xl p-6 border border-[#d5a310]/20 hover:border-[#d5a310]/50 transition-all"
                    >
                      <h4 className="text-xl font-bold text-[#f1f0eb] mb-2">{program.name}</h4>
                      <p className="text-[#f1f0eb]/70 mb-4">{program.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded-full text-sm">
                          {program.goal}
                        </span>
                        <span className="px-3 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded-full text-sm">
                          {program.level}
                        </span>
                        <span className="px-3 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded-full text-sm">
                          {program.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#d5a310]">
                          ${program.price}
                        </span>
                        <Button className="bg-[#d5a310] text-[#040304] hover:bg-[#d5a310]/90">
                          Learn More
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}