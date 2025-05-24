import { create } from 'zustand'


const selection =create((set) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({selectedUser }),
    
    newMessage : [],
    setNewMessage : (newMessage) => set({newMessage}),

    selectOption:"chat",
    setSelectOption : (selectOption) => set({selectOption}),

  }))
  

export default selection;