import { Table } from "../smaller/cards/Table"
import { StatsHolder } from "../smaller/cards/StatsHolder"
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import { Loader } from '../smaller/load/Loader'
const UserTable = () => {
  const { state,getUsers } = useGlobal()
  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <StatsHolder text="recent users">
      <div
        className="w-full rounded-lg p-0 m-0"
        style={{
          overflowY: "scroll",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {state.users.data.length === 0 ? (
          <Loader />
        ) : (
          <Table
            data={state.users.data}
            title={["index", "username", "email", "phone_number"]}
            type="users"
          />
        )}
      </div>
    </StatsHolder>
  );
}

export default UserTable
