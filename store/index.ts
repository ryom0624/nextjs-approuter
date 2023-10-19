// global state

import create from 'zustand'

type EditidTask = {
  id: string
  title: string | null
}

type LoginUser =  {
  id: string | undefined
  email: string | undefined
}

type State = {
  editTask: EditidTask
  updateTask: (payload: EditidTask) => void
  resetTask: () => void
  loginUser: LoginUser
  updateLoginUser: (payload: LoginUser) => void
  resetLoginUser: () => void
}

const useStore = create<State>((set) => ({
  editTask: {
    id: '',
    title: ''
  },
  updateTask: (payload: EditidTask) => set(() => ({ editTask: payload })),
  resetTask: () => set(() => ({ editTask: { id: '', title: '' } })),

  loginUser: {
    id: '',
    email: ''
  },
  updateLoginUser: (payload: LoginUser) => set(() => ({ loginUser: payload })),
  resetLoginUser: () => set(() => ({ loginUser: { id: '', email: '' } }))
}))

export default useStore
