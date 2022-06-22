import {InputLabel, Slider} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {formData} from "./types";

const SpicinessForm = ({control}: {control: Control<formData, any>}) => {
  return (
    <Controller
      name="soup.spiciness_scale"
      control={control}
      defaultValue={1}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <InputLabel id="spiciness-slider-label">
            select spiciness level
          </InputLabel>

          <Slider
            onChange={onChange}
            value={value}
            min={1}
            max={10}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </>
      )}
      rules={{required: "Spiciness level required"}}
    />
  );
};

export default SpicinessForm;
