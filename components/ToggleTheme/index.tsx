"use client"

import { useEffect } from "react"

export default function ToggleTheme() {
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(darkModeQuery)
  }, [])
  return <button onClick={() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.matches ? document.documentElement.classList.remove("dark") : document.documentElement.classList.add("dark")
  }}>toggle theme</button>
}