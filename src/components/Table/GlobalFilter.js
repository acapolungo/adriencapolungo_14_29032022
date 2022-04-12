import React from 'react'

/**
 * filtering function
 * 
 * @param { string } filter
 * @param { string } setFilter
 * @return { GlobalFilter }
 */
export default function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      Search: {' '}
      <input className='table__search' value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}
