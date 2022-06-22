export type formData = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich" | "";
  pizza?: {no_of_slices: string; diameter: string};
  soup?: {spiciness_scale: number};
  sandwich?: {slices_of_bread: string};
};

export type dataToSend = {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};
