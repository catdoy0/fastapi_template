import {  useState } from "react"
import { Mail, User } from "lucide-react"

import Logo from "../components/common/widgets/Logo"
import Modal from "../components/common/modals/Modal"
import Spinner from "../components/common/widgets/Spinner"
import CommonButton from "../components/common/widgets/CommonButton"
import LoadingScreen from "../components/common/LoadingScreen"
import CommonInput from "../components/common/widgets/CommonInput"
import ScrollToTopButton from "../components/common/widgets/ScrollToTopButton"
import DarkModeButton from "../components/common/widgets/DarkModeButton"
import BackButton from "../components/common/widgets/BackButton"
import GoogleLogo from "../components/common/widgets/GoogleLogo"
import UserAvatar from "../components/common/widgets/UserAvatar"

function ShowcaseSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="flex min-h-44 flex-wrap items-center justify-center gap-8 rounded-xl bg-slate-50 p-6 transition-colors dark:bg-slate-950">
        {children}
      </div>
    </section>
  )
}

/**
 * Development-only visual reference for shared UI components.
 *
 *  http://localhost:5173/test-components
 *  remove after development
 **/
export default function TestComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={`min-h-screen px-4 py-10 transition-colors sm:px-6 `}>
      {isLoading && (
        <>
          <CommonButton
            className="z-999 fixed bottom-1/3 left-1/2 -translate-x-1/2"
            onClick={() => setIsLoading(false)}
          >
            Remove Loading
          </CommonButton>
          <LoadingScreen />
        </>
      )}

      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Component showcase
          </h1>

          <div className="flex items-center gap-3">
            <DarkModeButton />
          </div>
        </header>

        <div className="grid gap-6">
          <ShowcaseSection title="LoadingScreen">
            <CommonButton onClick={() => setIsLoading(true)}>
              Show loading screen
            </CommonButton>
          </ShowcaseSection>

          <ShowcaseSection title="Logo">
            <Logo size={80} />
            <Logo size={110} />
            <Logo size={140} />


            <div className="rounded-lg bg-[#0b213d] p-4">
              <Logo variant="title" size={60} />
            </div>

          </ShowcaseSection>

          <ShowcaseSection title="Spinner">
            <Spinner size={24} />
            <Spinner size={40} />
            <Spinner size={56} />
          </ShowcaseSection>

          <ShowcaseSection title="CommonButton">
            <CommonButton variant="default">
              Default
            </CommonButton>
            <CommonButton variant="outline">
              Outline
            </CommonButton>
            <CommonButton disabled>
              Disabled
            </CommonButton>
          </ShowcaseSection>

          <ShowcaseSection title="UserAvatar">
            <UserAvatar initials="MS" />
            <UserAvatar initials="JD" tone="sidebar" />
            <UserAvatar initials="AB" size={48} />
          </ShowcaseSection>

          <ShowcaseSection title="CommonInput">
            <div className="flex w-full max-w-100 flex-col gap-5">
              <CommonInput
                id="email"
                label="Email Address"
                type="email"
                icon={<Mail size={18} />}
                placeholder="admin@gmail.com"
              />
              <CommonInput
                id="name"
                label="Name"
                type="text"
                icon={<User size={18} />}
                placeholder="placeholder"
              />
              <CommonInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Modal">
            <CommonButton onClick={() => setIsModalOpen(true)}>
              Open Modal
            </CommonButton>
          </ShowcaseSection>


          <ShowcaseSection title="DarkModeButton">
            <DarkModeButton />
          </ShowcaseSection>

          <ShowcaseSection title="BackButton">
            <BackButton />
          </ShowcaseSection>

          <ShowcaseSection title="GoogleLogo">
            <div className="flex items-center gap-6">
              <GoogleLogo size={16} />
              <GoogleLogo size={24} />
              <GoogleLogo size={32} />
              <CommonButton
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <GoogleLogo size={16} /> Sign in with Google
              </CommonButton>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="ScrollToTopButton">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rendered once at the bottom of this page, appears after scrolling
              halfway.
            </p>
          </ShowcaseSection>
        </div>

        <ScrollToTopButton />
      </div>

      <Modal
        className="bg-white dark:bg-slate-900"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Example modal
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Lorem ipsum.
        </p>
        <div className="mt-6 flex justify-end">
          <CommonButton
            variant="outline"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </CommonButton>
        </div>
      </Modal>
    </div>
  )
}
