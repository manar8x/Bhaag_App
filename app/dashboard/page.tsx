'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Dumbbell, Target, Trophy, LineChart, Calendar, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/protected-route'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-2"
              animate={{
                scale: [1, 1.02, 1],
                textShadow: [
                  "0 0 0px rgba(0,255,209,0)",
                  "0 0 10px rgba(0,255,209,0.5)",
                  "0 0 0px rgba(0,255,209,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              Welcome back, {user?.name}!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Continue your fitness journey with personalized workouts and track your progress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group bg-primary text-black font-raleway font-semibold hover:glow transition-all duration-300"
                onClick={() => router.push('/dashboard/workouts')}
              >
                Start Workout
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold hover:border-primary/50 transition-all duration-300"
                onClick={() => router.push('/dashboard/progress')}
              >
                View Progress
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 25px 5px rgba(0, 255, 209, 0.25)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-[300px]"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-black/30 rounded-lg border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div 
                    className="text-xl font-semibold bg-gradient-to-r from-[#00FFD1] to-[#2B8FFF] bg-clip-text text-transparent"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }}
                  >
                    TODAY'S WORKOUT
                  </motion.div>
                </div>
                <div className="mt-6 flex-1">
                  <p className="text-muted-foreground/90 font-medium">
                    Complete your scheduled workout for today and stay on track with your fitness goals.
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="w-full bg-black/30 text-primary hover:text-primary border-primary/30 hover:border-primary hover:bg-primary/10 font-raleway font-semibold transition-all duration-300 group flex items-center justify-center gap-2"
                    onClick={() => router.push('/dashboard/workouts')}
                  >
                    View Workout
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 25px 5px rgba(0, 255, 209, 0.25)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-[300px]"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-black/30 rounded-lg border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LineChart className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div 
                    className="text-xl font-semibold bg-gradient-to-r from-[#00FFD1] to-[#2B8FFF] bg-clip-text text-transparent"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }}
                  >
                    PROGRESS OVERVIEW
                  </motion.div>
                </div>
                <div className="mt-6 flex-1">
                  <p className="text-muted-foreground/90 font-medium">
                    Track your achievements and see how far you've come in your fitness journey.
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="w-full bg-black/30 text-primary hover:text-primary border-primary/30 hover:border-primary hover:bg-primary/10 font-raleway font-semibold transition-all duration-300 group flex items-center justify-center gap-2"
                    onClick={() => router.push('/dashboard/progress')}
                  >
                    View Progress
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 25px 5px rgba(0, 255, 209, 0.25)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-[300px]"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-black/30 rounded-lg border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Calendar className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div 
                    className="text-xl font-semibold bg-gradient-to-r from-[#00FFD1] to-[#2B8FFF] bg-clip-text text-transparent"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }}
                  >
                    UPCOMING SCHEDULE
                  </motion.div>
                </div>
                <div className="mt-6 flex-1">
                  <p className="text-muted-foreground/90 font-medium">
                    Plan your workouts and stay consistent with your fitness routine.
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="w-full bg-black/30 text-primary hover:text-primary border-primary/30 hover:border-primary hover:bg-primary/10 font-raleway font-semibold transition-all duration-300 group flex items-center justify-center gap-2"
                    onClick={() => router.push('/dashboard/schedule')}
                  >
                    View Schedule
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-20 bg-card/50 backdrop-blur-lg rounded-xl p-8 border border-border/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-gradient"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(0,255,209,0)",
                      "0 0 10px rgba(0,255,209,0.5)",
                      "0 0 0px rgba(0,255,209,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Recent Achievements
                </motion.h2>
                <p className="mt-2 text-muted-foreground">Celebrate your fitness milestones</p>
              </div>
              <Button
                variant="outline"
                className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold hover:border-primary/50 transition-all duration-300"
                onClick={() => router.push('/dashboard/achievements')}
              >
                View All
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(0, 255, 209, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-background/50 rounded-lg p-4 border border-border/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-2 bg-primary/10 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Award className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">5-Day Streak</h3>
                      <p className="text-sm text-muted-foreground">Completed 5 workouts in a row</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 