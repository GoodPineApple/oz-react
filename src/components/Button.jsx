import { memo } from 'react'
import { Button as MuiButton } from '@mui/material'

const Button = memo(({
  onClick,
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  ...rest
}) => {
  console.log('Button')
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      {...rest}
    >
      {loading ? '로딩 중...' : children}
    </MuiButton>
  )
})

export default Button
