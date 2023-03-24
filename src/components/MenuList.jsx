import { useState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CartButtonOnMenuItem from './CartButtonOnMenuItem'

export default function MenuList({ menus, counts, setCounts }) {
  const setCount = (idx) => (value) => {
    counts[idx] = value
    setCounts([...counts])
  }

  return (
    <List dense className='w-full md:w-7/12 md:!mr-7'>
      {menus.map((menu, idx) => {
        return (
          <ListItem
            // className="mr-5"
            key={menu.title}
            secondaryAction={<CartButtonOnMenuItem count={counts[idx]} setCount={setCount(idx)} />}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText>{menu.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
