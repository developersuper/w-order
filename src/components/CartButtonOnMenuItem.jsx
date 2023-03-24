import * as React from 'react'
import Badge from '@mui/material/Badge'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function CartButtonOnMenuItem({ count, setCount }) {
  const addCount = () => {
    setCount(count + 1)
  }
  const removeCount = () => {
    setCount(count - 1 < 0 ? 0 : count - 1)
  }
  return (
    <>
      <ButtonGroup disableElevation aria-label='Disabled elevation buttons'>
        <Button onClick={addCount}>Add</Button>
        <Button onClick={removeCount}>Remove</Button>
      </ButtonGroup>
      <Badge badgeContent={count} color='primary'>
        <ShoppingCartIcon color='action' />
      </Badge>
    </>
  )
}
