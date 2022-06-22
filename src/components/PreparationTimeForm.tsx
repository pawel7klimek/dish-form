import {Control, Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {formData} from "../types";

const PreparationTimeForm = ({control}: {control: Control<formData, any>}) => {
  return (
    <Controller
      name="preparation_time"
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <TextField
          autoComplete="off"
          label="preparation time"
          variant="standard"
          value={value}
          onChange={onChange}
          error={!!error}
          placeholder="HH:MM:SS"
          helperText={error ? error.message : null}
          // inputProps={{
          //   inputMode: "numeric",
          //   pattern: "[1-6]{1,8}",
          // }}
        />
      )}
      rules={{required: "Preparation time required"}}
    />
  );
};

export default PreparationTimeForm;
