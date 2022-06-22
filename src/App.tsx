import {useEffect, useState} from "react";
import "./App.css";
import {useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {formData, dataToSend} from "./types";
import NameField from "./components/NameField";
import PreparationTimeField from "./components/PreparationTimeField";
import SelectField from "./components/SelectField";
import NoOfSlicesField from "./components/NoOfSlicesField";
import DiameterField from "./components/DiameterField";
import SpicinessField from "./components/SpicinessField";
import SlicesOfBreadField from "./components/SlicesOfBreadField";

function App() {
  const {
    watch,
    control,
    formState: {isSubmitSuccessful},
    handleSubmit,
    reset,
  } = useForm<formData>({
    defaultValues: {
      name: "",
      preparation_time: "",
      type: "",
      pizza: {no_of_slices: "", diameter: ""},
      soup: {spiciness_scale: 1},
      sandwich: {slices_of_bread: ""},
    },
  });

  const watchSelect = watch("type");

  const [submittedData, setSubmittedData] = useState<formData>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        preparation_time: "",
        type: "",
        pizza: {no_of_slices: "", diameter: ""},
        soup: {spiciness_scale: 1},
        sandwich: {slices_of_bread: ""},
      });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  const sendPOST = async (data: dataToSend) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    };
    const url = "https://frosty-wood-6558.getsandbox.com:443/dishes";
    return fetch(url, requestOptions);
  };

  const onSubmit = async (data: formData) => {
    if (data.type !== "") {
      const dataToSend: dataToSend = {
        name: data.name,
        preparation_time: data.preparation_time,
        type: data.type,
      };
      if (data.type === "pizza") {
        //@ts-ignore
        dataToSend.no_of_slices = parseInt(data.pizza?.no_of_slices);
        //@ts-ignore
        dataToSend.diameter = parseInt(data.pizza?.diameter);
      } else if (data.type === "soup") {
        dataToSend.spiciness_scale = data.soup?.spiciness_scale;
      } else {
        //@ts-ignore
        dataToSend.slices_of_bread = parseInt(data.sandwich?.slices_of_bread);
      }
      setSubmittedData(data);
      console.log(sendPOST(dataToSend));
    }
  };

  const buildSelect = (dish: string) => {
    switch (dish) {
      case "pizza":
        return (
          <>
            <div className="box no_of_slices">
              <NoOfSlicesField control={control} />
            </div>
            <div className="box diameter">
              <DiameterField control={control} />
            </div>
          </>
        );

      case "soup":
        return (
          <div className="box spiciness_scale">
            <SpicinessField control={control} />
          </div>
        );

      case "sandwich":
        return (
          <div className="box slices_of_bread">
            <SlicesOfBreadField control={control} />
          </div>
        );
    }
  };

  return (
    <div className="main-box">
      <div className="form">
        <div className="box name">
          <NameField control={control} />
        </div>
        <div className="box preparation_time">
          <PreparationTimeField control={control} />
        </div>
        <div className="select box">
          <SelectField control={control} />
        </div>
        {buildSelect(watchSelect)}
        <div className="button-box">
          <Button onClick={handleSubmit(onSubmit)} variant="outlined">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
