import "@testing-library/jest-dom"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme() {
    return {
      theme: "light",
      setTheme: jest.fn(),
    }
  },
}))

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation() {
    return {
      t: (str) => str,
      i18n: {
        language: "bn",
        changeLanguage: jest.fn(),
      },
    }
  },
})) 