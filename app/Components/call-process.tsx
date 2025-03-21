//process flow 

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Loader2 } from "lucide-react"

export default function ProcessFlow() {
  const [currentPhase, setCurrentPhase] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const phases = [
    {
      title: "Initial Phase",
      description: "Starting the process",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      title: "Ongoing Phase",
      description: "Processing your request",
      icon: Loader2,
      color: "bg-amber-500",
    },
    {
      title: "Completion Phase",
      description: "Process successfully completed",
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (currentPhase !== null && currentPhase < 2 && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            clearInterval(interval as NodeJS.Timeout)

            // Small delay before moving to next phase
            setTimeout(() => {
              if (currentPhase < 2) {
                setCurrentPhase(currentPhase + 1)
                setProgress(0)
              } else {
                setIsComplete(true)
              }
            }, 500)

            return 100
          }
          return newProgress
        })
      }, 50) // Speed of progress bar
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentPhase, isComplete])

  const startProcess = () => {
    setCurrentPhase(0)
    setProgress(0)
    setIsComplete(false)
  }

  const resetProcess = () => {
    setCurrentPhase(null)
    setProgress(0)
    setIsComplete(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 md:p-8">
      {currentPhase === null ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Three-Stage Process Flow</h2>
          <Button onClick={startProcess} size="lg">
            Start Process
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-8">
            {phases.map((phase, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index < currentPhase
                      ? "bg-primary text-primary-foreground"
                      : index === currentPhase
                        ? phases[currentPhase].color + " text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentPhase ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    (() => {
                      const PhaseIcon = phase.icon
                      return <PhaseIcon className={`w-5 h-5 ${index === currentPhase ? "animate-spin" : ""}`} />
                    })()
                  )}
                </div>
                <div className="text-xs mt-2 text-center max-w-[80px]">{phase.title}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentPhase !== null &&
                      (() => {
                        const IconComponent = phases[currentPhase].icon
                        return <IconComponent className={`w-5 h-5 ${currentPhase < 2 ? "animate-spin" : ""}`} />
                      })()}
                    {currentPhase !== null && phases[currentPhase].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{phases[currentPhase].description}</p>
                  <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                    <motion.div
                      className={`h-2.5 rounded-full ${phases[currentPhase].color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                  <p className="text-sm text-right">{progress}%</p>
                </CardContent>
                <CardFooter>
                  {currentPhase === 2 && progress === 100 ? (
                    <Button onClick={resetProcess} className="w-full">
                      Reset Process
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {currentPhase < 2 ? "Processing..." : "Completing..."}
                    </p>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

//interview process

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, FileSearch, Phone } from "lucide-react"

export default function InterviewProcess() {
  const [currentPhase, setCurrentPhase] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const phases = [
    {
      title: "Setting up bot for you",
      description: "Configuring AI assistant to handle your interview process",
      icon: Bot,
      color: "bg-blue-500",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "AI bot setup illustration",
    },
    {
      title: "Analyzing candidate",
      description: "Reviewing candidate profile and tailoring questions",
      icon: FileSearch,
      color: "bg-purple-500",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "Candidate analysis illustration",
    },
    {
      title: "Calling candidate",
      description: "Initiating automated phone interview with the candidate",
      icon: Phone,
      color: "bg-green-500",
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "Phone call illustration",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (currentPhase !== null && currentPhase < 3 && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            clearInterval(interval as NodeJS.Timeout)

            // Small delay before moving to next phase
            setTimeout(() => {
              if (currentPhase < 2) {
                setCurrentPhase(currentPhase + 1)
                setProgress(0)
              } else {
                setIsComplete(true)
                // Auto-reset after completion with a delay
                setTimeout(() => {
                  setCurrentPhase(null)
                  setProgress(0)
                  setIsComplete(false)
                }, 3000)
              }
            }, 500)

            return 100
          }
          return newProgress
        })
      }, 50) // Speed of progress bar
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentPhase, isComplete])

  const startProcess = () => {
    setCurrentPhase(0)
    setProgress(0)
    setIsComplete(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 md:p-8 bg-gray-50">
      {currentPhase === null ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">AI-Driven Interview Process</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Our AI assistant will set up, analyze candidates, and conduct phone interviews automatically.
          </p>
          <Button onClick={startProcess} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Interview Process
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between mb-8">
            {phases.map((phase, index) => {
              // Create a variable for the icon component
              const PhaseIcon = phase.icon

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      index < currentPhase
                        ? "bg-green-500 text-white"
                        : index === currentPhase
                          ? phase.color + " text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <PhaseIcon className={`w-6 h-6 ${index === currentPhase ? "animate-pulse" : ""}`} />
                  </div>
                  <div className="text-xs mt-2 text-center max-w-[100px]">{phase.title}</div>
                  {index < phases.length - 1 && (
                    <div
                      className="hidden md:block absolute h-[2px] bg-gray-200 w-[calc(33.333%-4rem)] left-[calc(16.666%+2rem)]"
                      style={{ left: `calc(${(index + 0.5) * 33.333}% + 1rem)`, top: "1.5rem" }}
                    >
                      <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{
                          width: index < currentPhase ? "100%" : index === currentPhase ? `${progress}%` : "0%",
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {currentPhase !== null && (
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={phases[currentPhase].image}
                      alt={phases[currentPhase].imageAlt}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <CardHeader className="absolute bottom-0 left-0 text-white">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        {(() => {
                          const IconComponent = phases[currentPhase].icon
                          return <IconComponent className="w-5 h-5" />
                        })()}
                        {phases[currentPhase].title}
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="pt-6">
                    <p className="mb-6 text-gray-600">{phases[currentPhase].description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <motion.div
                        className={`h-3 rounded-full ${phases[currentPhase].color}`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 px-6 py-4">
                    <div className="w-full">
                      <p className="text-sm text-gray-600">
                        {progress < 100 ? (
                          <span className="flex items-center">
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                              className="w-2 h-2 bg-green-500 rounded-full mr-2"
                            />
                            {currentPhase === 0
                              ? "Setting up your AI interviewer..."
                              : currentPhase === 1
                                ? "Analyzing candidate profile..."
                                : "Initiating phone call..."}
                          </span>
                        ) : (
                          <span className="text-green-600 font-medium">
                            {currentPhase === 0
                              ? "Bot setup complete!"
                              : currentPhase === 1
                                ? "Analysis complete!"
                                : "Call successfully initiated!"}
                          </span>
                        )}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}


