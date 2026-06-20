"use client"

import { IconCloud } from "@/components/ui/icon-cloud"

const countryCodes = [
  "br", "de", "jp", "fr", "ar", "es", "gb-eng", "it", "pt", "nl",
  "mx", "kr", "us", "co", "uy", "ec", "tn", "ci", "sn", "ma",
  "gh", "cm", "ng", "sa", "qa", "au", "ca", "hr", "rs", "ch",
  "be", "dk", "se", "pl", "cz", "at", "cv", "cw", "cr", "pa",
]

export function FlagCloud() {
  const images = countryCodes.map(
    (code) => `https://flagcdn.com/80x60/${code.replace("gb-eng", "gb")}.png`
  )

  return (
    <div className="flex items-center justify-center py-6">
      <IconCloud images={images} />
    </div>
  )
}
