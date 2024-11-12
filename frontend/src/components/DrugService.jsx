import axios from 'axios';

const API_URL = 'http://localhost:3000/check-interaction';

// function to get drug interactions from list
export const getDrugInteractions = async (drugList) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                drug1: drugList[0],
                drug2: drugList[1],
                drug3: drugList[2],
                drug4: drugList[3],
                drug5: drugList[4],
                drug6: drugList[5]
        }
        });

        return response.data.interactions;
    } catch (error) {
        console.error('Error fetching drug interactions: ', error);
        return [];
    }
};
