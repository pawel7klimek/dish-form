import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {formData} from "../types";

const SelectForm = ({control}: {control: Control<formData, any>}) => {
  return (
    <Controller
      name="type"
      control={control}
      // defaultValue=""
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <FormControl variant="standard" sx={{m: 1, minWidth: 170}}>
            <InputLabel margin="dense" id="type-select-label">
              select dish type
            </InputLabel>
            <Select
              fullWidth
              labelId="type-select-label"
              id="type-select"
              value={value}
              onChange={onChange}
              label="Type"
              variant="standard"
            >
              <MenuItem disabled>select dish type</MenuItem>
              <MenuItem value={"pizza"}>pizza</MenuItem>
              <MenuItem value={"soup"}>soup</MenuItem>
              <MenuItem value={"sandwich"}>sandwich</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      rules={{required: "Dish type required"}}
    />
  );
};

export default SelectForm;
