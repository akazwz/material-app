import { useRecoilState } from 'recoil'
import { htmlIconState, htmlTitleState } from '../state/html-head'

export const useHTMLHead = () => {
  const [icon, setIcon] = useRecoilState(htmlIconState)
  const [title, setTitle] = useRecoilState(htmlTitleState)

  return {
    icon,
    title,
    setIcon,
    setTitle,
  }
}

