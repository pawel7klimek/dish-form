import {Control, Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {formData} from "../types";

const NameField = ({control}: {control: Control<formData, any>}) => {
  return (
    <div className="box name">
      <Controller
        name="name"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            autoComplete="off"
            label="dish name"
            variant="standard"
            value={value}
            onChange={onChange}
            error={!!error}
            placeholder="dish name"
            helperText={error ? error.message : null}
          />
        )}
        rules={{required: "Dish name required"}}
      />
    </div>
  );
};

export default NameField;
