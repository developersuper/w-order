export default function UserInfo({ userInfo }) {
  return (
    <div className="p-5 xl:w-1/3 md:w-1/2 mx-auto xl:border-l-2 border-gray-500">
      <p className="text-3xl text-center mb-4">User Info</p>
      <div className="border xl:border-none border-gray-500 rounded px-5 py-3">
        <p className="text-lg flex justify-between">
          <span>Name: </span><span>{userInfo.name}</span>
        </p>
        <p className="text-lg flex justify-between my-1 xl:my-5">
          <span>Phone: </span><span>{userInfo.phone}</span>
        </p>
        <p className="text-lg flex justify-between">
          <span>Address: </span><span>{userInfo.address}</span>
        </p>
      </div>
    </div>
  )
}
