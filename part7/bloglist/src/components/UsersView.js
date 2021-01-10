import React from 'react'
import { Link } from 'react-router-dom'

const UsersView = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td/>
            <td>
              blogs created
            </td>
          </tr>
        </tbody>
        {
          users.map(user => (
            <tbody key={user.id}>
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            </tbody>
          ))
        }
      </table>
    </div>
  )
}

export default UsersView