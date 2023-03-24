export default function Bill({ menus, counts }) {
  let total = 0;

  return (
    <div className="my-4 p-3 w-full md:w-5/12 md:border-l border-gray-500 text-lg flex justify-center items-center">
      <div>
        {
          menus.map((menu, idx) => {
            total += menu.price * counts[idx];
            return (
              <div className="flex" key={idx}>
                <p className="w-16 mr-5">{menu.title} : </p>
                <p className="w-10">${menu.price}</p><span className="mx-2">*</span>
                <p className="w-8">{counts[idx]}</p><span className="mr-4">=</span>
                <p>${menu.price * counts[idx]}</p>
              </div>
            )
          })
        }
        <p className="pl-32 border-t border-gray-500">total <span className="mx-3">=</span> ${total}</p>
      </div>
    </div>
  )
}
