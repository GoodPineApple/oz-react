import { memo } from 'react'
import type { ReactNode, MouseEventHandler } from 'react'
import { Button as MuiButton } from '@mui/material'
import type { ButtonProps as MuiButtonProps } from '@mui/material'

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
}

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
}: ButtonProps & Omit<MuiButtonProps, keyof ButtonProps>) => {
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
