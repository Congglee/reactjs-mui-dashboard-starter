import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function UsersIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M16 11c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm-8 0c1.65 0 3-1.35 3-3S9.65 5 8 5 5 6.35 5 8s1.35 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.54 0-1.14.04-1.78.12C15.73 14.12 18 15.24 18 17v2h6v-2c0-2.66-5.33-4-8-4z' />
    </SvgIcon>
  )
}
