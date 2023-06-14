import { action, atom } from '@reatom/core'
import userAPI from './userAPI'

export const loadingAtom = atom(false, 'loadingAtom')
export const usersAtom = atom([], 'usersAtom')
export const totalUsersAtom = atom(
  (ctx) => ctx.spy(usersAtom).length,
  'totalUsersAtom',
)

export const fetchUsers = action(async (ctx) => {
  loadingAtom(ctx, true)

  const response = await ctx.schedule(() => userAPI.fetchAll())

  loadingAtom(ctx, false)
  usersAtom(ctx, response.data)
}, 'fetchUsers')

export const removeUser = action((ctx, id) => {
  usersAtom(ctx, (list) => list.filter((user) => user.id !== id))
}, 'removeUser')

export const changeUser = action((ctx, id, changes) => {
  usersAtom(ctx, (list) =>
    list.map((user) => (user.id === id ? { ...user, ...changes } : user)),
  )
}, 'changeUser')
