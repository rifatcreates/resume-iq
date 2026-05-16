import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { toast } from "sonner"
import { supabase } from "../../lib/supabase"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

type AuthMode = 'login' | 'signup'

const AuthForm = () => {
    const [mode, setMode] = useState<AuthMode>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const isLogin = mode === 'login'

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters') 
            return
        }

        setIsLoading(true)

        try {
            if (isLogin) {
                const {data, error} = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) throw error
                if(data.user) {
                    toast.success('Welcome back!')
                    navigate('/dashboard')
                }
            } else {
                const {error} = await supabase.auth.signUp({
                    email,
                    password
                })

                if(error) throw error
                toast.success('Account created successfully!')
                navigate('/dashboard')
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-main-gradient flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl text-bold text-teal-400 mb-2">ResumeIQ</h1>
                    <p className="text-slate-400 text-sm">AI-Powered Resume Analyzer</p>
                </div>

                <Card className="bg-slate-700/50 border border-slate-500/50 shadow-xl shadow-black/20">
                    <CardHeader className="text-center">
                        <CardTitle className="text-white text-2xl">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
                        <CardDescription className="text-slate-400">{isLogin ? 'Sign in to access your resume analyses' : 'Sign up to start analyzing your resume'}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex rounded-lg bg-slate-900/80 p-1 gap-1">
                            <button
                                onClick={() => setMode('login')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                                ${isLogin
                                    ? 'bg-linear-to-r from-teal-500 to-sky-500 text-white shadow'
                                    : 'text-slate-400 hover:text-slate-200 bg-transparent'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                                ${!isLogin
                                    ? 'bg-linear-to-r from-teal-500 to-sky-500 text-white shadow'
                                    : 'text-slate-400 hover:text-slate-200 bg-transparent'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-300 text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-900/80 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-300 text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-900/80 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500/50 pr-10"
                                />
                                <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                                >
                                {showPassword ? <FaRegEyeSlash/> : <FaRegEye />}
                                </button>
                            </div>
                        </div>

                        <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-linear-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-80 transition cursor-pointer mt-2">{isLogin ? 'Sign In' : 'Create Account'}</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthForm