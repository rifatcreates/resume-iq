import { useAuth } from "../../hooks/useAuth"
import { Button } from "../ui/button"

const Header = () => {
    const {user, signout} = useAuth()

    const getNameFromEmail = (email: string) => {
        const namePart = email.split('@')[0]
        const parts = namePart.split('.')
        return parts
            .map((part) => {
                const word = part.replace(/[0-9]/g, '')
                return word.charAt(0).toUpperCase() + word.slice(1)
            })
            .filter((part) => part.length > 0)
            .join(' ')
    }

    const fullName = getNameFromEmail(user?.email || '')

    return (
        <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/30 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-500 to-sky-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <h1 className="text-xl font-bold text-teal-400">ResumeIQ</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm hidden sm:block">
                        {fullName}
                    </span>
                    <Button onClick={signout} className="bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition cursor-pointer text-sm">Logout</Button>
                </div>
            </div>
        </header>
    )
}

export default Header