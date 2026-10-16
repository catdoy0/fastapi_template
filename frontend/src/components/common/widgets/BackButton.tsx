import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

interface BackButtonProps {
  to?: number | string
  className?: string
}

export default function BackButton({
  to = -1,
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (typeof to === "number") navigate(to)
    else navigate(to)
  }


  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className={`
        mr-1 grid h-7 w-7 place-items-center rounded-md text-[#4368a6]
        transition-colors
        hover:bg-[#eef6ff]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2458ae]
        dark:text-blue-300
        dark:hover:bg-slate-800
        ${className}
      `}
    >
      <ArrowLeft size={14} />
    </button>
  )
}
