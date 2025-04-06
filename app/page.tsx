"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import WhyBhaag from "@/components/why-bhaag"
import KeyFeatures from "@/components/key-features"
import Testimonials from "@/components/testimonials"
import SamplePlan from "@/components/sample-plan"
import Faq from "@/components/faq"
import ComingSoon from "@/components/coming-soon"
import Footer from "@/components/footer"
import SamplePlanModal from "@/components/sample-plan-modal"

export default function Home() {
  const [showSamplePlanModal, setShowSamplePlanModal] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  useEffect(() => {
    if (showSamplePlanModal) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.removeProperty("overflow")
    }
  }, [showSamplePlanModal])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1C1C2E] text-white">
      <motion.div 
        className="fixed inset-0 z-0 opacity-20" 
        style={{ y: backgroundY }}
        initial={false}
      >
        <div className="absolute inset-0 bg-[url('/background-grid.svg')] bg-repeat opacity-10"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <Hero />
        <WhyBhaag />
        <KeyFeatures />
        <Testimonials />
        <SamplePlan onPreviewClick={() => setShowSamplePlanModal(true)} />
        <Faq />
        <ComingSoon />
        <Footer />
      </div>

      {showSamplePlanModal && <SamplePlanModal onClose={() => setShowSamplePlanModal(false)} />}
    </div>
  )
}

