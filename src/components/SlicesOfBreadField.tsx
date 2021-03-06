import {TextField} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {formData} from "../types";

const SlicesOfBreadField = ({control}: {control: Control<formData, any>}) => {
  return (
    <Controller
      name="sandwich.slices_of_bread"
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <TextField
          type="number"
          label="number of slices"
          variant="standard"
          value={value}
          onChange={onChange}
          error={!!error}
          placeholder="number of slices"
          helperText={error ? error.message : null}
        />
      )}
      rules={{required: "Number of slices required"}}
    />
  );
};

export default SlicesOfBreadField;
