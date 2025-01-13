'use client'

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background text-foreground p-4">
      <AnimatePresence>
        <motion.div 
          className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
        >
          <div className="text-9xl font-bold opacity-20">404</div>
        </motion.div>
      </AnimatePresence>
      <motion.div 
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found.</p>
        <Link href="/articles">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            Return to Articles
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

