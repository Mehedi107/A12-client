const SectionLatestDiscuss = () => {
  const discussions = [
    {
      id: 1,
      title: 'Is AI replacing traditional development?',
      author: 'Sophia Carter',
      description:
        'With AI tools like Copilot and ChatGPT, will developers still write code manually in the future?',
      category: 'Artificial Intelligence',
      replies: 42,
      views: 1_200,
      date: 'Feb 18, 2025',
      link: '/discussion/ai-vs-traditional-dev',
    },
    {
      id: 2,
      title: 'Best frameworks for building SaaS apps in 2025?',
      author: 'Liam Johnson',
      description:
        'Looking for the best frontend and backend frameworks for launching a SaaS product.',
      category: 'Software Development',
      replies: 27,
      views: 850,
      date: 'Feb 17, 2025',
      link: '/discussion/best-saas-frameworks',
    },
    {
      id: 3,
      title: 'Web3 adoption—Is it still the future?',
      author: 'Emma Roberts',
      description:
        "Web3 was hyped, but is it still relevant in 2025? Let's discuss the real-world adoption.",
      category: 'Blockchain & Web3',
      replies: 33,
      views: 1_050,
      date: 'Feb 16, 2025',
      link: '/discussion/web3-adoption-future',
    },
  ];

  return (
    <section className="py-24 bg-base-100 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="font-bold text-center mb-8">Latest Discussions</h2>

        {/* Discussion List */}
        <div className="space-y-6">
          {discussions.map(discussion => (
            <div key={discussion.id} className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title sm:text-xl font-medium ">
                  {discussion.title}
                </div>
                <div className="collapse-content">
                  <p className="text-sm sm:text-base">
                    {discussion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionLatestDiscuss;
// <div
//   key={discussion.id}
//   className="card bg-base-200 shadow-lg p-4 hover:shadow-xl transition"
// >
//   <h3 className="text-lg font-semibold">{discussion.title}</h3>
//   <p className="text-secondary">By {discussion.author}</p>
//   <div className="flex justify-between text-sm text-gray-500">
//     <span>🗨️ {discussion.replies} Replies</span>
//     <span>📅 {discussion.date}</span>
//   </div>
// </div>
