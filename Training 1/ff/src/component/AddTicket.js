import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

export const AddTicket = () => {
    const uniqueId = uuidv4();
  return (
    <div>
        <Link to={`/disactive/${uniqueId}`}>
            {/* <h1>{uniqueId}</h1> */}
            <button type="button" class="btn btn-info">Add New Tickets</button>
        </Link>
    </div>
  )
}
