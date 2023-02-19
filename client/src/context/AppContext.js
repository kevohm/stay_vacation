import React, {useContext, createContext} from "react"

const appContext = createContext();
const initialState = { name: "hello" }

const AppContext = ({ children }) => {
  return (
      <appContext.Provider value={initialState}>
          {children}
    </appContext.Provider>
  )
}
const useGlobal = () => {
    return useContext(appContext)
}

export { AppContext , useGlobal}