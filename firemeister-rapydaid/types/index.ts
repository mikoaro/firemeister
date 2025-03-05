export interface Activity {
  id: string;
  date: string;
  description: string;
  type: "visit" | "lab" | "admission";
}

export type CustomDocument = {
  id: string
  name: string
  content: string
}

