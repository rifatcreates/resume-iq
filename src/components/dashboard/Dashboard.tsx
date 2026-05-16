import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const Dashboard = () => {
    const navigate = useNavigate()

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-8 pt-2 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back !</h2>
                <p className="text-slate-400">Ready to analyze your resume?</p>
            </div>

            <div className="bg-linear-to-br from-teal-500/10 to-sky-500/10 border border-teal-500/20 rounded-2xl p-8 mb-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                    Analyze Your Resume
                </h3>
                <p className="text-slate-400 mb-6 text-sm">
                    Upload your PDF resume and get instant AI-powered feedback
                </p>
                <Button
                onClick={() => navigate('/analyze')}
                className="bg-linear-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-80 transition cursor-pointer px-8"
                >
                    Start New Analysis
                </Button>
            </div>
        </div>
    )
}

export default Dashboard