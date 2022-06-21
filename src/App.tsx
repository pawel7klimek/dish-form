import React from "react";
import "./App.css";
import {useForm, Controller, useFormState} from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import {v4 as uuidv4} from "uuid";

function App() {
  const {
    watch,
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<formData>({
    defaultValues: {
      id: "",
      name: "",
    },
  });

  type data = {
    id: string;
    name: string;
    preparation_time: string;
    pizza?: {no_of_slices: number; diameter: number};
    soup?: {spiciness_scale: number};
    sandwich?: {slices_of_bread: number};
  };

  type formData = data & {type: "pizza" | "soup" | "sandwich" | ""};

  const watchSelect = watch("type");

  const onSubmit = (data: formData) => {
    if (data.type !== "") {
      data.id = uuidv4();
      alert(JSON.stringify(data));
    }
  };

  const {isValidating, touchedFields} = useFormState({control});

  const buildSelect = (dish: string) => {
    switch (dish) {
      case "pizza":
        return (
          <>
            <Controller
              name="pizza.no_of_slices"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  disabled={isValidating}
                  type="number"
                  label="no_of_slices"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  placeholder="number of slices"
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Controller
              name="pizza.diameter"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  type="number"
                  label="diameter"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  placeholder="diameter"
                  helperText={error ? error.message : null}
                />
              )}
            />
          </>
        );

      case "soup":
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
                  style={{width: "30%", marginLeft: "2rem"}}
                  min={1}
                  max={10}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </>
            )}
          />
        );

      case "sandwich":
        return (
          <Controller
            name="sandwich.slices_of_bread"
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                type="number"
                label="number of slices of bread"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                placeholder="number of slices"
                helperText={error ? error.message : null}
              />
            )}
          />
        );
    }
  };

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // };
  //   fetch("url", requestOptions);
  return (
    <div style={{padding: "2rem"}}>
      <div>
        <Controller
          name="name"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              autoComplete="off"
              label="dish name"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              placeholder="dish name"
              helperText={error ? error.message : null}
            />
          )}
          rules={{required: "Dish name required"}}
        />

        <Controller
          name="preparation_time"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              label="preparation time"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              placeholder="HH:MM:SS"
              helperText={error ? error.message : null}
            />
          )}
          rules={{required: "Preparation time required"}}
        />
        <Controller
          name="type"
          control={control}
          // defaultValue=""
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel margin="dense" id="type-select-label">
                  select dish type
                </InputLabel>
                <Select
                  error={touchedFields.type}
                  // error={value !== "" && !touchedFields.type}
                  // error={isValidating && !touchedFields.type}
                  fullWidth
                  labelId="type-select-label"
                  id="type-select"
                  value={value}
                  onChange={onChange}
                  label="Type"
                  variant="outlined"
                  style={{width: 400}}
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
        {buildSelect(watchSelect)}
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          Outlined
        </Button>
      </div>
    </div>
  );
}

export default App;
