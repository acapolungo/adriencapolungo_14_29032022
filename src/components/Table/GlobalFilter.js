import React from 'react'

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      Search: {' '}
      <input className='table__search' value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}
