const SectionUpcomingLaunche = () => {
  const upcomingLaunches = [
    {
      id: 1,
      name: 'VisionAI',
      image: ' https://i.ibb.co.com/SX6ZNkHc/vision-ai.png', // Replace with actual image
      launchDate: 'March 10, 2025',
      category: 'AI Tools',
    },
    {
      id: 2,
      name: 'DevFlow',
      image: ' https://i.ibb.co.com/RGYCCHyq/dev-flow.png', // Replace with actual image
      launchDate: 'March 15, 2025',
      category: 'Developer Tools',
    },
    {
      id: 3,
      name: 'GameX',
      image: 'https://i.ibb.co.com/XxfWhFtf/gameX.png', // Replace with actual image
      launchDate: 'March 20, 2025',
      category: 'Gaming',
    },
  ];
  return (
    <section className="py-24 bg-base-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="font-bold text-center mb-8">Upcoming Launches</h2>

        {/* Launch Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingLaunches.map(launch => (
            <div key={launch.id} className="card bg-base-200 shadow-lg">
              <figure>
                <img
                  src={launch.image}
                  alt={launch.name}
                  className="w-20 h-20 mt-5 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">{launch.name}</h3>
                <p className="">{launch.category}</p>
                <span className="bg-neutral/25 rounded-md text-sm p-3">
                  Launching on: {launch.launchDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionUpcomingLaunche;
