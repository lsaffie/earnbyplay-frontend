// React Rewards.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import { useUser } from '../UserContext';

const Rewards = () => {
    const [rewards, setRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState('');
    const [amount, setAmount] = useState(''); // do I need this?
    const { currentUser, isLoading } = useUser();

    useEffect(() => {
        if (currentUser) {
            axios.get(`${appConfig.SERVER_URL}/api/list-rewards?userId=${currentUser.id}`,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            })
              .then(response => {
                  setRewards(response.data);
              })
              .catch(error => {
                  console.error("Error fetching rewards", error);
              });
        }
    }, [currentUser]);

    const selectReward = (reward) => {
      setSelectedReward(reward);
    };

    const handleCashOut = () => {
        if (currentUser) {
            axios.post(`${appConfig.SERVER_URL}/api/reward-cashout`, { currentUser, reward_id: selectedReward, amount })
                .then(response => {
                    alert("Cash out successful");
                })
                .catch(error => {
                    alert("Cash out failed");
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Select Your Reward</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rewards.map(reward => (
                    <div key={reward.id} 
                         className={`p-4 border rounded-lg cursor-pointer ${selectedReward && selectedReward.id === reward.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                         onClick={() => selectReward(reward)}>
                        <h3 className="text-lg font-semibold">{reward.name}</h3>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        {/* Add other reward details here */}
                    </div>
                ))}
            </div>
            {selectedReward && (
                <button className="mt-4 px-4 py-2 bg-ebp-cta-green text-white rounded hover:bg-ebp-cta-green" onClick={handleCashOut}>
                    Cash Out Selected Reward
                </button>
            )}
        </div>
    );
};

export default Rewards;