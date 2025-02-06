import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { useEffect, useState } from "react";
import { Modes } from "../utils/constants";
import { updateTransportationMode } from "../redux/actions/RouteActions";
import { connect } from "react-redux";

interface TravelModeDropDownProps {
    routeId: number,
    destinationId: number,
    updateTransportationMode: any,
    routes: any,
}

const TravelModeDropDown = (props: TravelModeDropDownProps) => {
    const {routeId, destinationId, updateTransportationMode, routes} = props;
    const travelModes = [
        {
            id: Modes.WALKING.id,
            name: Modes.WALKING.name,
            icon: <DirectionsWalkIcon/>,
        },
        {
            id: Modes.DRIVING.id,
            name: Modes.DRIVING.name,
            icon: <DriveEtaIcon />,
        },
    ]

    const [selectedMode, setSelectedMode] = useState<any>(travelModes[1]);

    useEffect(() => {
        routes.forEach((route: any) => {
            if (route.id === routeId) {
                route.destinations.forEach((destination: any) => {
                    if (destination.id === destinationId) {
                        setSelectedMode(destination.transportation_mode);
                    }
                })
            }
        });
    }, [routes, routeId, destinationId])

    const handleChangeInput = async(event: SelectChangeEvent) => {
        const selectedValue = event.target.value
        setSelectedMode(selectedValue);
        try {
            await updateTransportationMode(routeId, destinationId, event.target.value.name);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormControl>
            <Select
                labelId='travel-modes'
                id='travel-modes'
                value={(travelModes.find(item => item.name === selectedMode)) || travelModes[1]}
                onChange={handleChangeInput}
                sx={{
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
            >
                {travelModes.length > 0 && travelModes.map((mode: any, count: number) => (
                    <MenuItem value={mode} key={mode.id}>{mode.icon}</MenuItem>
                ))}
            </Select>
    </FormControl>
    );
}

const mapStateToProps = (state: any) => {
    return {
      routes: state.route.routes,
    }
  };
  
  const mapDispatchToProps = {
    updateTransportationMode,
  };

export default connect(mapStateToProps, mapDispatchToProps)(TravelModeDropDown);
