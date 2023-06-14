import { useAtom, useAction } from '@reatom/npm-react'
import {
  fetchUsers,
  removeUser,
  loadingAtom,
  usersAtom,
  totalUsersAtom,
  changeUser,
} from './model'
// import styles from "./UsersList.module.css";

export function User({ id }) {
  const user = useAtom((ctx) =>
    ctx.spy(usersAtom).find((user) => user.id === id),
  )
  const handleChange = useAction((ctx, e) => {
    changeUser(ctx, id, { first_name: e.currentTarget.value })
  })
  const handleDelete = useAction((ctx) => {
    removeUser(ctx, id)
  })

  return (
    <>
      <input
        style={{ width: '80%' }}
        value={user.first_name}
        onChange={handleChange}
      />

      <div style={{ width: '20%' }}>
        <button onClick={handleDelete}>remove</button>
      </div>
    </>
  )
}

export function UsersList() {
  const [count] = useAtom(totalUsersAtom)
  const [users] = useAtom(usersAtom)
  const [usersLoading] = useAtom(loadingAtom)
  const handleFetch = useAction(fetchUsers)

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Fetch Users"
          onClick={handleFetch}
          disabled={usersLoading}
        >
          Fetch Users
        </button>
      </div>
      <div className={styles.row}>
        There are <span className={styles.value}>{count}</span> users.{' '}
        {count === 0 && `Why don't you fetch some more?`}
      </div>
      {users.map(({ id }) => (
        <div className={styles.row} key={id}>
          <User id={id} />
        </div>
      ))}
    </div>
  )
}
