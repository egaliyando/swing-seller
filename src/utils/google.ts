// eslint-disable-next-line consistent-return
export const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=id&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`)
        const data = await response.json();

        if (data?.results?.length > 0) {
            const placeId = data.results[0]?.place_id;
            const address = restrictTypesAddress('plus_code', data.results);
            const postalCode = getAddressComponent('postal_code', data.results[0]);
            const values = {
                address: address.formatted_address,
                original: address,
                postalCode,
                placeId,
            };
            return values;
        }
        console.error('No address found for the given coordinates.');

    } catch (error) {
        console.error('Error getting address:', error);
    }
};

export const getAddressComponent = (param: string, place: any) => {
    let temp: any;
    temp = place?.address_components?.find((component: any) => component.types.includes(param));
    temp = temp?.long_name ?? temp?.short_name;
    return temp;
};

export const restrictTypesAddress = (param: string, result: any) => {
    try {
        let temp: any;
        let res: any;
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < result?.length; index++) {
            const element = result[index];
            temp = element?.address_components?.find((component: any) => component.types.includes(param));
            if (!temp) {
                res = element;
                break;
            }
        }
        return res;
    } catch (error) {
        console.log('err restrict', error);
        return null;
    }
};