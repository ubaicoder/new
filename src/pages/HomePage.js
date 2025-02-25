"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Player } from "@lottiefiles/react-lottie-player"
import { Upload, FileText, BarChart2, Zap, Trash2, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { useToast } from "../components/ui/use-toast"
import robotAnimation from "../components/lotties/Animation - 1740323018783 (1).json"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.5,
    },
  },
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const pulseAnimation = {
  initial: { scale: 1, opacity: 0.9 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
}

const HomePage = () => {
  const [files, setFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [scanningSection, setScanningSection] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const playerRef = useRef(null)
  const controls = useAnimation()

  // Animate on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 100) {
        controls.start("visible")
      }
    }

    window.addEventListener("scroll", handleScroll)
    controls.start("visible") // Start initial animation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [controls])

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Validate file size
      const validFiles = acceptedFiles.filter((file) => file.size <= 5 * 1024 * 1024) // 5MB limit

      if (validFiles.length !== acceptedFiles.length) {
        toast({
          title: "File size exceeded",
          description: "Some files were not added because they exceed the 5MB limit.",
          variant: "destructive",
        })
      }

      setFiles(validFiles)
      if (validFiles.length > 0) {
        simulateUpload()

        // Play animation
        if (playerRef.current) {
          playerRef.current.play()
        }
      }
    },
    [toast],
  )

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const simulateUpload = () => {
    setUploadProgress(0)
    const sections = ["Personal Information", "Experience", "Education", "Skills"]
    let sectionIndex = 0

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setShowSuccess(true)
          toast({
            title: "Analysis Complete!",
            description: "Your resume has been successfully analyzed.",
            duration: 3000,
          })
          setTimeout(() => {
            setShowSuccess(false)
            navigate("/results")
          }, 1500)
          return 100
        }
        setScanningSection(sections[sectionIndex % sections.length])
        sectionIndex++
        return prevProgress + 5
      })
    }, 200)
  }

  const features = [
    {
      icon: FileText,
      title: "ATS-Friendly Analysis",
      description: "Ensure your resume passes through Applicant Tracking Systems with our AI-powered analysis.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: BarChart2,
      title: "Detailed Insights",
      description: "Get comprehensive feedback on content, format, and keywords to improve your resume.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "AI-Powered Suggestions",
      description:
        "Receive tailored recommendations to enhance your resume and increase your chances of landing interviews.",
      gradient: "from-amber-500 to-orange-500",
    },
  ]

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen font-sans transition-all duration-500 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900"
    >
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={containerVariants}>
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              AI-Powered Resume Analyzer
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Upload your resume and get AI-driven insights to land your dream job!
            </motion.p>
            <motion.div
              className="w-full h-64 md:h-96"
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
            >
              <Player ref={playerRef} autoplay loop src={robotAnimation} style={{ height: "100%", width: "100%" }} />
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Upload Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  {...getRootProps()}
                  className={`relative p-8 rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed group
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                    }
                    before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-300
                    ${
                      isDragActive
                        ? "before:bg-blue-500/5 dark:before:bg-blue-500/10"
                        : "before:bg-transparent group-hover:before:bg-blue-500/5 dark:group-hover:before:bg-blue-500/10"
                    }
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  variants={pulseAnimation}
                  initial="initial"
                  animate={isHovered ? "initial" : "animate"}
                >
                  <input {...getInputProps()} />
                  <div className="relative z-10 flex flex-col items-center space-y-4">
                    <motion.div
                      className={`p-4 rounded-full transition-all duration-300 ${
                        isDragActive
                          ? "bg-blue-100 dark:bg-blue-900/50"
                          : "bg-gray-100 dark:bg-gray-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Upload
                        className={`h-8 w-8 transition-all duration-300 ${
                          isDragActive
                            ? "text-blue-500"
                            : "text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                        }`}
                      />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Drag & drop your resume(s) here, or click to select files
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Supports PDF, DOC, DOCX (Max 5MB each)
                      </p>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {files.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{file.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => removeFile(file)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="pt-0">
                {files.length > 0 && (
                  <motion.button
                    onClick={simulateUpload}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span>Analyze Resume</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div initial="hidden" animate={controls} variants={containerVariants} className="mt-24 space-y-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12"
            variants={itemVariants}
          >
            Powerful Features
          </motion.h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full rounded-2xl">
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials or Additional Info Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-24 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Why Choose Our AI Resume Analyzer?
          </motion.h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Advanced AI Technology</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our cutting-edge AI algorithms analyze your resume against thousands of successful examples to provide
                actionable insights and recommendations.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Industry-Specific Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get tailored feedback based on your industry and target role, ensuring your resume stands out to
                recruiters and hiring managers.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">ATS Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure your resume passes through Applicant Tracking Systems with our specialized keyword and format
                analysis.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get comprehensive analysis in seconds, allowing you to quickly improve your resume and apply to jobs
                with confidence.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress Overlay */}
      <AnimatePresence>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 inset-x-0 px-4 z-50"
          >
            <Card className="max-w-md mx-auto backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-0 shadow-2xl rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  {showSuccess ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <motion.div
                      className="rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  )}
                  <span>{showSuccess ? "Analysis Complete!" : "Analyzing Resume..."}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{uploadProgress}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <motion.div
                      className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <motion.p
                  key={scanningSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {scanningSection && `Scanning ${scanningSection}...`}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default HomePage

