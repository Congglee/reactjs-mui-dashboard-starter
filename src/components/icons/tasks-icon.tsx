import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function TasksIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM8 8h7v2H8V8zm0 4h7v2H8v-2z' />
    </SvgIcon>
  )
}
