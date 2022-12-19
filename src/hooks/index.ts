import { useDocumentTitle } from '@mantine/hooks'

export const usePageTitle = (title: string) => {
  useDocumentTitle(`${title} | Mantine UI`)
}
