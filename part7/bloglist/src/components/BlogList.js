import React from 'react'
import { Link } from 'react-router-dom'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core'


const Blog = ({ blog }) => {
  return (
    <div>
      <TableRow key={blog.id}>
        <TableCell>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </TableCell>
        <TableCell>
          {blog.author}
        </TableCell>
      </TableRow>
    </div>
  )
}

const BlogList = ({ blogs }) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList