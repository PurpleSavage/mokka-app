
const colors =[
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#808080" },
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" }
  
]
export default function BackgroundOptions() {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-gray-400 text-sm">Colors</p>
        <div className="grid grid-cols-3 w-full">
          {colors.map((color) => (
            <div key={color.value} className="flex flex-col gap-1 items-center">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.value }}></div>
              <span>{color.name}</span>
            </div>
          ))} 
        </div>
      </div>
      <div>
        <p>Background styles</p>
        <div>

        </div>
      </div>
    </div>
  )
}
