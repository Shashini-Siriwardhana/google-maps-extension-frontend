import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Autocomplete, FormControl, TextField, Tooltip } from "@mui/material";

interface PlaceDropdownProps {
    label: string,
    handleSelect: any,
    value?: string,
  }
  
const PlaceDropdown = ( props:  PlaceDropdownProps) => {
    const {label, handleSelect, value} = props;
    const map = useMap();
    const places = useMapsLibrary('places');

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<any>([])
    const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

    const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

    const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

    useEffect(() => {
        if (!places || !map) return;
    
        setAutocompleteService(new places.AutocompleteService());
        setPlacesService(new places.PlacesService(map));
        setSessionToken(new places.AutocompleteSessionToken());
    
      }, [map, places]);

    useEffect( () => {
        const fetchPlaces = async() => {
            if (!autocompleteService || !inputValue) {
                setSuggestions([]);
                return;
            }
        
            const request = {input: inputValue, sessionToken};
            const response = await autocompleteService.getPlacePredictions(request);
    
            setSuggestions(response.predictions);
        }
        fetchPlaces()
    }, [autocompleteService, sessionToken, inputValue]);

    const handleChangeInput = (event: any) => {
        setInputValue(event.target.value)
        }

    return (
        <FormControl className="drop-down">
            <Tooltip title={value}>
                <Autocomplete
                disablePortal
                value={value}
                options={suggestions.map((item: any, count: number) => item.description)}
                onChange={(_, newValue) => {
                    if (newValue) {
                        handleSelect(newValue);
                    }
                }}
                renderInput={(params) => <TextField {...params} label={label} onChange={handleChangeInput} />}
                />
            </Tooltip>
        </FormControl>
    )

}

export default PlaceDropdown;