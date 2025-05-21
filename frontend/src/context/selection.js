import { create } from 'zustand'


const selection =create((set) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({selectedUser }),
    
    newMessage : [],
    setNewMessage : (newMessage) => set({newMessage})

  }))
  

export default selection;