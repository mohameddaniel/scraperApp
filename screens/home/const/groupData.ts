
import { Product } from "./type";
export const groupData = (data: Product[], groupSize: number) => {
    const grouped = [];
    for (let i = 0; i < data?.length; i += groupSize) {
      grouped.push(data.slice(i, i + groupSize));
    }
    return grouped;
  };
  