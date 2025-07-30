import './App.scss'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from './components/Loading/Loading'
import { Layout } from './components/Layout/Layout'
import { Main } from './components/Main/Main'
import { Dkm } from './components/Dkm/Dkm'
import { Guides } from './components/Guides/Guides'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp
      webApp.ready()
      
      document.documentElement.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color || '#000000')
      
      const backButton = webApp.BackButton
      backButton.hide()
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/dkm" element={<Dkm />} />
          <Route path="/guides" element={<Guides />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App