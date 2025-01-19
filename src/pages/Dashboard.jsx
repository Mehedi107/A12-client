const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Navigation Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Navigation</h2>
        <ul>
          <li className="mb-2">
            <a href="#item1" className="block p-2 rounded hover:bg-gray-700">
              Item 1
            </a>
          </li>
          <li className="mb-2">
            <a href="#item2" className="block p-2 rounded hover:bg-gray-700">
              Item 2
            </a>
          </li>
          <li className="mb-2">
            <a href="#item3" className="block p-2 rounded hover:bg-gray-700">
              Item 3
            </a>
          </li>
          <li className="mb-2">
            <a href="#item4" className="block p-2 rounded hover:bg-gray-700">
              Item 4
            </a>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 bg-gray-100 p-4 overflow-y-auto">
        <div id="item1" className="mb-4">
          <h2 className="text-xl font-bold mb-2">Item 1</h2>
          <p>Content for Item 1</p>
        </div>
        <div id="item2" className="mb-4">
          <h2 className="text-xl font-bold mb-2">Item 2</h2>
          <p>Content for Item 2</p>
        </div>
        <div id="item3" className="mb-4">
          <h2 className="text-xl font-bold mb-2">Item 3</h2>
          <p>Content for Item 3</p>
        </div>
        <div id="item4" className="mb-4">
          <h2 className="text-xl font-bold mb-2">Item 4</h2>
          <p>Content for Item 4</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
