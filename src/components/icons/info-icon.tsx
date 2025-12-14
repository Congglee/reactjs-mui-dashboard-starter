import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function InfoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' />
    </SvgIcon>
  )
}
