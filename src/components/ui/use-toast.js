import { useToast as useToastOriginal } from "./toast"

export const useToast = () => {
  return useToastOriginal()
}

