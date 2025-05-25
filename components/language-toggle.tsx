"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setLanguage } from "@/store/slices/languageSlice"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

export function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const currentLanguage = useAppSelector((state) => state.language.current)

  useEffect(() => {
    i18n.changeLanguage(currentLanguage)
  }, [currentLanguage, i18n])

  const handleLanguageChange = (language: "bn" | "en") => {
    dispatch(setLanguage(language))
    i18n.changeLanguage(language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 h-9 px-3"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {currentLanguage === "bn" ? "বাংলা" : "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("bn")}
          className={`${currentLanguage === "bn" ? "bg-accent" : ""} justify-center`}
        >
          {t("language.bangla")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`${currentLanguage === "en" ? "bg-accent" : ""} justify-center`}
        >
          {t("language.english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
