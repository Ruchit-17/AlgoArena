import React, { useEffect, useState } from 'react';

const AlgoArena = () => {
    const [contests, setContests] = useState([]);
    const [view, setView] = useState('list'); // State for view toggle
    const [duration, setDuration] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');

  // Fetch contest data from API
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('/contest/data', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-api-token': 'ff67a5e2dee3d5602c2618ff45b0ea4130be98866bbd7a0c8648192e2b9a74c25e8895e973e489ccef9a070791dd1b2f356104e9aee850a744dfb45771f3cd30',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
         setContests(data.data);
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    fetchContests();
  }, []);

  const filteredContests = contests.filter((contest) => {
    // Platform filter
    const matchesPlatform = selectedPlatform ? contest.platform.toLowerCase() === selectedPlatform.toLowerCase() : true;

    // Duration filter
    const matchesDuration = duration
        ? (duration === '<1' && contest.duration < 3600) ||
          (duration === '1-3' && contest.duration >= 3600 && contest.duration <= 10800) ||
          (duration === '>3' && contest.duration > 10800)
        : true;

    return matchesPlatform && matchesDuration;
});


  const calculateDuration = (durationInSeconds) => {
    const durationInMinutes = (durationInSeconds) / (60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  

  return (
    <div className="bg-background-dark min-h-screen text-white p-4 sm:p-8 lg:p-12 mx-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
    

        {/* Switch Button */}
        <div className='flex w-full md:w-auto justify-center md:justify-start'>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-1 text-white rounded-s-full ${
              view === 'list' ? 'bg-orange' : 'bg-filter'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-1 text-white rounded-e-full ${
              view === 'calendar' ? 'bg-orange' : 'bg-filter'
            }`}
          >
            Calendar View
          </button>
        </div>

        {/* Dropdowns for Sorting */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto justify-center md:justify-start">
        <select
            className="bg-filter text-white px-4 py-2 rounded-full w-full sm:w-auto text-sm"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">All Platforms</option>
            <option value="Codechef">Codechef</option>
            <option value="Codeforces">Codeforces</option>
            <option value="gfg">GeeksforGeeks</option>
            {/* Add additional platform options */}
          </select>

          
          <select
            className="bg-filter text-white px-4 py-2 rounded-full w-full sm:w-auto text-sm"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          >
            <option value="">Duration</option>
            <option value="<1">Less than 1 hour</option>
            <option value="1-3">1-3 hours</option>
            <option value=">3">More than 3 hours</option>
            {/* Add your duration options */}
          </select>
        </div>
      </div>
      <div className="container mx-auto p-4 flex justify-center">
                {view === 'calendar' ? (
                    <div className="text-center  text-white p-4 rounded-md text-lg">
                        Work Under Progress...
                    </div>
                ) : (
                    <div className="w-full max-w-4xl overflow-x-auto">
                        <table className="table-auto w-full text-left text-sm sm:text-base">
                            <thead>
                                <tr className="bg-table-head text-xs sm:text-sm">
                                    <th className="p-3">Platform</th>
                                    <th className="p-3">Contest</th>
                                    <th className="p-3">Start Time</th>
                                    <th className="p-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContests.map((contest, index) => (
                                    <tr key={contest.contest_id} className={index % 2 === 0 ? 'bg-table-dark-1' : 'bg-table-dark-2'}>
                                        <td className="p-4 flex items-center gap-2">
                                            <img src={contest.image_url} alt={contest.platform} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                                            <span>{contest.platform}</span>
                                        </td>
                                        <td className="p-3">{contest.name}</td>
                                        <td className="p-3">{new Date(contest.start_date).toLocaleString()}</td>
                                        <td className="p-3">{calculateDuration(contest.duration)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default AlgoArena;
