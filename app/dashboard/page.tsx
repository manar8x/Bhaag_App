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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
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
                className="group bg-primary text-black font-raleway font-semibold hover:glow"
                onClick={() => router.push('/dashboard/workouts')}
              >
                Start Workout
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
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
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur-lg rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Today's Workout</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Complete your scheduled workout for today and stay on track with your fitness goals.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                onClick={() => router.push('/dashboard/workouts')}
              >
                View Workout
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur-lg rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Progress Overview</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Track your achievements and see how far you've come in your fitness journey.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                onClick={() => router.push('/dashboard/progress')}
              >
                View Progress
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur-lg rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Upcoming Schedule</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Plan your workouts and stay consistent with your fitness routine.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                onClick={() => router.push('/dashboard/schedule')}
              >
                View Schedule
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-20 bg-card/50 backdrop-blur-lg rounded-xl p-8 border border-border/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Recent Achievements</h2>
                <p className="mt-2 text-muted-foreground">Celebrate your fitness milestones</p>
              </div>
              <Button
                variant="outline"
                className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                onClick={() => router.push('/dashboard/achievements')}
              >
                View All
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-background/50 rounded-lg p-4 border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
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