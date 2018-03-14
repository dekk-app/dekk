---
displayName: "Reference: Using Icons"
description: "Material design icons for Dekk"
tags: 
  - Reference
options:
  order: 13
---

# Icons

Dekk provides a collection of material design icons.

The usage is very basic.

```jsx
import React from 'react'
import Icon from '@dekk/icon'
import {person, people} from '@dekk/icon/lib/social'

export const PersonIcon = ({size = '1em'}) => (
  <Icon size={size} icon={person}/>
)

export const PeopleIcon = ({size = '1em'}) => (
  <Icon size={size} icon={people}/>
)
```
