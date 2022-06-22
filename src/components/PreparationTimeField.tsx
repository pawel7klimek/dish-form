import {Control, Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {formData} from "../types";

const PreparationTimeField = ({control}: {control: Control<formData, any>}) => {
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
        />
      )}
      rules={{
        required: "Preparation time required",
        pattern: {
          value: /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/,
          message: "HH:MM:SS format required",
        },
      }}
    />
  );
};

export default PreparationTimeField;
