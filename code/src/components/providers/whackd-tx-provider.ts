//const WHACKD_TX_ENDPOINT = 'https://data.whosgettingwhackd.com/data';
const WHACKD_TX_ENDPOINT = '/test-state.json';

function processTransactionsJSON(data) {
    let blocks = data.blocks;
    var result = [];
    
    for (var blockId in blocks) {
        for (var transactionId in blocks[blockId]) {
            for (var eventId in blocks[blockId][transactionId]) {
                let event = blocks[blockId][transactionId][eventId];
                let transaction = { "id": blockId, "transactionId": transactionId, value: event.value, timestamp: event.timestamp}
                result.push(transaction);
            }
        }
    }

    return result;
}

export async function getWhackdTransactions(callback: Function) {
    return fetch(WHACKD_TX_ENDPOINT, {mode: "no-cors"})
        .then(response => {
            return response.text()
        })
        .then((data) => {
            let transactionList = data ? JSON.parse(data) : {};
            let parsedList = processTransactionsJSON(transactionList);
            callback(parsedList)
        })
        .catch((error) => {
            console.log("Error when fetching WHACKD transaction list");
        })
    }