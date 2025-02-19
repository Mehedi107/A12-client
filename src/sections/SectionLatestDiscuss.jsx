const SectionLatestDiscuss = () => {
  const discussions = [
    {
      id: 1,
      title: 'Is AI replacing traditional development?',
      author: 'Sophia Carter',
      replies: 42,
      date: 'Feb 18, 2025',
    },
    {
      id: 2,
      title: 'Best frameworks for building SaaS apps in 2025?',
      author: 'Liam Johnson',
      replies: 27,
      date: 'Feb 17, 2025',
    },
    {
      id: 3,
      title: 'Web3 adoption—Is it still the future?',
      author: 'Emma Roberts',
      replies: 33,
      date: 'Feb 16, 2025',
    },
  ];
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Discussions
        </h2>

        {/* Discussion List */}
        <div className="space-y-6">
          {discussions.map(discussion => (
            <div
              key={discussion.id}
              className="card bg-base-200 shadow-lg p-4 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold">{discussion.title}</h3>
              <p className="text-secondary">By {discussion.author}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>🗨️ {discussion.replies} Replies</span>
                <span>📅 {discussion.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionLatestDiscuss;
