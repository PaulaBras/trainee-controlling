interface Controller {
    cid: string;
    name: string;
    callsign: string;
    rating: number;
}

async function fetchVatsimData(
    callsignPrefix: string,
    callsignSuffix: string,
    rating: number
): Promise<Controller[]> {
    const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    const data = await response.json();
    const controllers = data.controllers as Controller[];
    const filteredControllers = controllers.filter(
        (controller) =>
            controller.callsign.startsWith(callsignPrefix) &&
            controller.callsign.endsWith(callsignSuffix) &&
            controller.rating === rating
    );
    return filteredControllers;
}

// Example usage
const callsignPrefix = 'ED';
const callsignSuffix = 'TWR';
const rating = 2;

fetchVatsimData(callsignPrefix, callsignSuffix, rating).then((edControllers) => {
    console.log(edControllers);
});