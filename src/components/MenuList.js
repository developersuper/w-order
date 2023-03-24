import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CartButtonOnMenuItem from './CartButtonOnMenuItem'

const menus = [
  {
    title: 'Dish1',
    description: 'description, ..,.,. blabla....',
  },
  {
    title: 'Dish2',
    description: 'description, ..,.,. blabla....',
  },
  {
    title: 'Dish3',
    description: 'description, ..,.,. blabla....',
  },
]

export default function MenuList() {
  const [counts, setCounts] = useState([...Array.from({ length: menus.length }, (x) => 0)])

  const setCount = (idx) => (value) => {
    counts[idx] = value
    setCounts([...counts])
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {menus.map((menu, idx) => {
        return (
          <ListItem
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
