import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function AnalyticsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M3 17h2V7H3v10zm4 0h2V5H7v12zm4 0h2v-7h-2v7zm4 0h2V3h-2v14z' />
    </SvgIcon>
  )
}
