import {useEffect, useState} from "react";
import "./App.css";
import {useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {formData, dataToSend} from "./types";
import NameForm from "./components/NameForm";
import PreparationTimeForm from "./components/PreparationTimeForm";
import SelectForm from "./components/SelectForm";
import NoOfSlicesForm from "./components/NoOfSlicesForm";
import DiameterForm from "./components/DiameterForm";
import SpicinessForm from "./components/SpicinessForm";
import SlicesOfBreadForm from "./components/SlicesOfBreadForm";

function App() {
  const {
    watch,
    control,
    formState: {isSubmitSuccessful},
    handleSubmit,
    reset,
  } = useForm<formData>();

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
      alert(JSON.stringify(data));
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
      console.log(dataToSend);
    }
  };

  const buildSelect = (dish: string) => {
    switch (dish) {
      case "pizza":
        return (
          <>
            <div className="box no_of_slices">
              <NoOfSlicesForm control={control} />
            </div>
            <div className="box diameter">
              <DiameterForm control={control} />
            </div>
          </>
        );

      case "soup":
        return (
          <div className="box spiciness_scale">
            <SpicinessForm control={control} />
          </div>
        );

      case "sandwich":
        return (
          <div className="box slices_of_bread">
            <SlicesOfBreadForm control={control} />
          </div>
        );
    }
  };

  return (
    <div className="main-box">
      <div className="box name">
        <NameForm control={control} />
      </div>
      <div className="box preparation_time">
        <PreparationTimeForm control={control} />
      </div>
      <div className="select box">
        <SelectForm control={control} />
      </div>
      {buildSelect(watchSelect)}
      <div className="box button">
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
