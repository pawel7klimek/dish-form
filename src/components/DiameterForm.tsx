import {TextField} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {formData} from "../types";

const DiameterForm = ({control}: {control: Control<formData, any>}) => {
  return (
    <Controller
      name="pizza.diameter"
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <TextField
          type="number"
          label="diameter"
          variant="standard"
          value={value}
          onChange={onChange}
          error={!!error}
          placeholder="diameter"
          helperText={error ? error.message : null}
        />
      )}
      rules={{required: "Pizza diameter required"}}
    />
  );
};

export default DiameterForm;
