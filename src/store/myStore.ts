// import { create } from 'zustand'

// export const mystore = create((set) => ({
//     fileList: [],
//     setfileList: (x:[]) => set({ fileList: x }),
//     one:[],
//     setone: (x:[]) => set((state)=>({ one: x })),
// }))

import { create } from 'zustand';

export const mystore = create((set) => ({
  imgdata: [],
  //   updateBears: (newBears) => set((state) => ({ bears: [...state.bears,newBears]  })),
  updateimgdata: (newBears) => set(() => ({ imgdata: newBears })),
}));
