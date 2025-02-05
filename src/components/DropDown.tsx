import { Autocomplete, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface DropDownProps {
    value: string;
    label: string;
    handleChangeInput: any;
    menuItems: any[];
    handleSelect: any;
  }

const DropDown = (props : DropDownProps) => {
    const {value, label, handleChangeInput, menuItems, handleSelect} = props;
    return (
        <FormControl className="drop-down">
            <Autocomplete
            disablePortal
            options={menuItems}
            onChange={(_, newValue) => {
                if (newValue) {
                    handleSelect(newValue);
                }
            }}
            renderInput={(params) => <TextField {...params} label={label} onChange={handleChangeInput} />}
            />
            {/* <Select
                labelId={label}
                id={label}
                value={value}
                label={label}
                onChange={handleChangeInput}
                onClick={handleChangeInput}
                input={<Input />}
            > */}
                {/* {menuItems.length > 0 && menuItems.map((item: any, count: number) => (
                    <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
                ))} */}
            {/* </Select> */}
        </FormControl>
    );
}

export default DropDown;