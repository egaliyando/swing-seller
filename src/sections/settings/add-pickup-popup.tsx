import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from "debounce-promise"
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { grey } from '@mui/material/colors';
import { Box, Grid, Paper, colors, Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { getAddressFromLatLng } from 'src/utils/google';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

const debounceFetchAddress = debounce(getAddressFromLatLng, 1500)



export interface IAppProps {
    show: boolean,
    close: () => void,
}

type OptionType = {
    value: string;
    label: string;
    secondary_label?: any;
};

export default function AddPickupPopup(props: IAppProps) {
    const { show, close } = props
    const mapRef: any = React.useRef(null);
    const pickupLoc = useForm<any>({
        defaultValues: {},
    });

    const [centered, setCentered] = React.useState({ lat: -6.175392, lng: 106.827153 });


    const {
        reset,
        handleSubmit,
    }: any = pickupLoc;

    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    }: any = usePlacesService({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
        options: { types: [], componentRestrictions: { country: "id" }, input: "" }

    })


    // notes improvement :
    // 1. get address from lat long & drag map
    // 2. set placePredictions in state variable
    // 3. push the address in state (merge with placePredictions) and add flag drag: true
    // 4. filter mapping option from drag flag


    const location: any = pickupLoc.watch('location_pickup')
    const optionMapping = placePredictions?.map((v: any) => ({ label: v?.structured_formatting?.main_text, value: v?.place_id, secondary_label: v?.structured_formatting?.secondary_text }))

    const [customAddressFromDrag, setCustomAddressFromDrag] = React.useState("")
    const [secondaryAddress, setSecondaryAddress] = React.useState("")
    const [isShowDetailPickup, setIsShowDetailPickup] = React.useState(false)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`,
        libraries: ['places'],
    });

    // eslint-disable-next-line no-return-assign
    const handleLoad = (map: any) => (mapRef.current = map)

    const mapOptions = {
        disableDefaultUI: true,
        clickableIcons: false,
        scrollwheel: false,
        draggable: !isShowDetailPickup,
        zoomControl: true
    };

    const onSubmit = handleSubmit(async (datas: any) => {
        console.log('datas: ', datas);
        reset()
    });

    const centerIcon = () => (
        <Box>
            <div style={{ position: "fixed", left: "50%", top: "48%", zIndex: '40', marginLeft: "auto", marginRight: "auto", height: "80px", width: "80px", borderRadius: "100%", backgroundColor: "#5C00E6", opacity: '25%' }} className="transXY" />
            <div style={{ position: "fixed", left: "50%", top: "48%", zIndex: '40', marginLeft: "auto", marginRight: "auto", height: "64px", width: "64px", borderRadius: "100%", backgroundColor: "#5C00E6" }} className="transXY" />
            <div style={{ position: "fixed", left: "50%", top: "48.1%", zIndex: '40', marginLeft: "auto", marginRight: "auto" }} className="transXY">
                <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.0006 0.666504C8.17345 0.669331 5.46308 1.79439 3.465 3.79447C1.46692 5.79455 0.344579 8.50604 0.34458 11.3332C0.310796 14.7613 1.30894 18.1203 3.2093 20.9737C5.10966 23.8271 7.82435 26.0429 11.0006 27.3332C14.1758 26.0421 16.8894 23.8259 18.7887 20.9726C20.6881 18.1193 21.6855 14.7607 21.6512 11.3332C21.6513 8.50696 20.5296 5.79628 18.5327 3.79635C16.5358 1.79642 13.8268 0.670743 11.0006 0.666504ZM11.0006 15.3332C10.2095 15.3332 9.4361 15.0986 8.7783 14.659C8.1205 14.2195 7.60781 13.5948 7.30506 12.8639C7.00231 12.133 6.9231 11.3287 7.07744 10.5528C7.23178 9.77689 7.61274 9.06415 8.17215 8.50474C8.73156 7.94533 9.4443 7.56437 10.2202 7.41003C10.9961 7.25569 11.8004 7.3349 12.5313 7.63765C13.2622 7.9404 13.8869 8.45309 14.3265 9.11089C14.766 9.76869 15.0006 10.542 15.0006 11.3332C15.0006 12.394 14.5792 13.4115 13.829 14.1616C13.0789 14.9117 12.0614 15.3332 11.0006 15.3332Z"
                        fill="white"
                    />
                </svg>
            </div>
        </Box>
    );

    const handleCenterChanged = async () => {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        const res = await debounceFetchAddress(newPos.lat, newPos.lng)
        console.log('res: ', res);
        setCustomAddressFromDrag(res?.address)
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
            <DialogTitle>Add self pickup location</DialogTitle>
            <Form methods={pickupLoc} onSubmit={onSubmit}>
                <DialogContent>
                    <Paper variant='outlined' sx={{ height: '458px' }}>
                        {isLoaded ? (
                            <GoogleMap
                                id="map"
                                zoom={15}
                                center={centered}
                                onLoad={handleLoad}
                                options={mapOptions}
                                onZoomChanged={handleCenterChanged}
                                onDragEnd={() => {
                                    setCustomAddressFromDrag("Loading..")
                                    handleCenterChanged()
                                }}
                                mapContainerStyle={{ width: '100%', height: '100%' }}>
                                {isShowDetailPickup ?
                                    <Paper variant='elevation' sx={{ padding: 2, position: "relative", width: 500, marginLeft: "auto", marginRight: "auto", marginTop: 4, backgroundColor: colors.common.white }}>
                                        <Typography variant='h4'>Pickup details</Typography>
                                        <hr style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }} />

                                        <Grid container spacing={3}>
                                            <Grid item sm={12}>
                                                <Field.Text InputLabelProps={{ shrink: true }} name='pickup_at' label="Pickup at..." placeholder='Enter a brief name for the self pickup location' />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Field.Text InputLabelProps={{ shrink: true }} name='hour_start' label="Operational hour." type='time' />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Field.Text name='hour_end' type='time' />
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Field.Autocomplete label='Operational days' options={[]} name='op_day' />
                                            </Grid>
                                        </Grid>
                                    </Paper> :
                                    <Box sx={{ position: "relative", }}>
                                        {centerIcon()}
                                        <Box sx={{ position: "absolute", zIndex: '40', top: 70, width: "100%" }}>
                                            <Box boxShadow={5} borderRadius={1} sx={{ width: 400, backgroundColor: colors.grey[100], marginLeft: "auto", marginRight: "auto" }}>
                                                <Field.Autocomplete
                                                    options={optionMapping}
                                                    getOptionLabel={(option: OptionType | string) => (option as OptionType).label ?? optionMapping?.find((o: any) => o.value === option)?.label}
                                                    onChangeTextCustom={(e: any) => {
                                                        getPlacePredictions({ input: e.target.value })
                                                    }}
                                                    onChangeCustom={((v: any) => {
                                                        console.log('v: ', v);
                                                        setSecondaryAddress(v?.secondary_label)
                                                        setCustomAddressFromDrag(v?.label)
                                                        const geocoder = new google.maps.Geocoder();
                                                        geocoder.geocode(
                                                            {
                                                                placeId: v?.value,
                                                            },
                                                            (results: any, statusLoc: any) => {
                                                                if (statusLoc === google.maps.GeocoderStatus.OK) {
                                                                    const latitude = results[0].geometry.location.lat();
                                                                    const longitude = results[0].geometry.location.lng();
                                                                    setCentered({ lat: latitude, lng: longitude });
                                                                } else {
                                                                    console.log('err');
                                                                }
                                                            },
                                                        );
                                                    })}
                                                    renderOption={(propsOp: any, option) => (
                                                        <Box {...propsOp}>
                                                            <Iconify width="30px" icon='mdi:location' />
                                                            <Box marginLeft={1}>
                                                                <Typography fontSize={12} fontWeight={700}>{option?.label}</Typography>
                                                                <Typography fontSize={12} color={colors.grey[600]} fontWeight={400}>{option?.secondary_label}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    loading={isPlacePredictionsLoading}
                                                    placeholder='Search your golf course or address here for auto pin'
                                                    name='location_pickup' />
                                            </Box>
                                        </Box>
                                        <Box sx={{ position: "absolute", zIndex: '2', top: 350, width: "max-content", left: "23%" }}>
                                            <Box boxShadow={5} borderRadius={1} sx={{ width: 'max-content', backgroundColor: colors.common.black, marginLeft: "auto", marginRight: "auto", paddingLeft: 1.5, paddingRight: 1.5 }}>
                                                <Typography fontSize={14} textAlign="center" color={colors.common.white}>Drag the map to reposition the pin accurately</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                            </GoogleMap>
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
                                <Typography color={grey[300]} variant='h3'>Loading...</Typography>
                            </Box>
                        )}
                    </Paper>
                    <Paper sx={{ marginTop: 2 }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>{customAddressFromDrag}</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{secondaryAddress ?? "-"}</Typography>
                    </Paper>
                </DialogContent>

                <DialogActions>
                    {
                        isShowDetailPickup ?
                            <Box display="flex" justifyContent='space-between' sx={{ width: "100%" }}>
                                <Button variant="soft" onClick={() => setIsShowDetailPickup(!isShowDetailPickup)} autoFocus>
                                    Previous
                                </Button>
                                <Button variant="contained" onClick={close} autoFocus>
                                    Finish and save location
                                </Button>
                            </Box> :
                            <Box display="flex" justifyContent='space-between' sx={{ width: "100%" }}>
                                <Button variant="soft" onClick={close} autoFocus>
                                    Cancel
                                </Button>
                                <Button disabled={!location} variant="contained" onClick={() => setIsShowDetailPickup(!isShowDetailPickup)} autoFocus>
                                    Confirm location pin
                                </Button>
                            </Box>
                    }
                </DialogActions>
            </Form >

        </Dialog >
    );
}
