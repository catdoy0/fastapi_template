import { Navigate } from "react-router"
import { ROUTES } from "@/routes"

export default function LandingPage() {

  return (
    <main className="h-screen scroll-smooth bg-white text-slate-900 transition-colors duration-300 dark:bg-[#0f1724] dark:text-slate-100">
      <Navigate to={ROUTES.AUTHPAGE}/>
    </main>
  )
}
