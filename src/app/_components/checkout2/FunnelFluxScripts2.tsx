"use client"
import { useEffect, useRef, useCallback } from "react"
import { useTracking } from "@/app/_context/TrackingContext"

interface ClientSideScriptsProps {
  funnelFlux: string
}

const FunnelFluxScripts2: React.FC<ClientSideScriptsProps> = ({
  funnelFlux,
}) => {
  const tracking = useTracking()
  const scriptInjectedRef = useRef(false)

  const debouncedSetHitId = useCallback(
    debounce((value: string) => tracking.setHitId(value), 300),
    [tracking.setHitId]
  )

  const debouncedSetFfVid = useCallback(
    debounce((value: string) => tracking.setFfVid(value), 300),
    [tracking.setFfVid]
  )

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const externalHitId = urlParams.get("sub5")
    const externalFfVid = urlParams.get("vid")

    if (externalHitId) {
      console.log("Template 2 - External Hit ID found:", externalHitId)
      debouncedSetHitId(externalHitId)
    }

    if (externalFfVid) {
      console.log("Template 2 - External FF Vid found:", externalFfVid)
      debouncedSetFfVid(externalFfVid)
    }

    if (tracking.hitId && tracking.ffVid && !externalHitId) {
      console.log(
        "Template 2 - FF Vid and HitId already exists, skipping script injection"
      )
      return
    }

    const injectScripts = async () => {
      if (scriptInjectedRef.current) return
      scriptInjectedRef.current = true

      const fluxScript = document.createElement("script")
      fluxScript.innerHTML = funnelFlux
      document.head.appendChild(fluxScript)

      const additionalScript = document.createElement("script")
      additionalScript.innerHTML = `
        (function(w,d,u,f,x){w.flux=w.flux||function(){(w.flux.q=w.flux.q||[]).push(arguments)};
        f=d.getElementsByTagName('script')[0];
        x=d.createElement('script');x.async=1;x.src=u;
        f.parentNode.insertBefore(x,f)})(window,document,'https://go.buysplashcleaner.com/lumetric.js');
        flux('track', 'template2-view');
      `
      document.head.appendChild(additionalScript)
    }

    injectScripts()
  }, [funnelFlux, tracking, debouncedSetHitId, debouncedSetFfVid])

  return null
}

export default FunnelFluxScripts2

function debounce<F extends (...args: any[]) => any>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
