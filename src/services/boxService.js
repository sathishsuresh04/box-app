import * as uris from "./serviceUris";
import baseService from "./baseService";
import { data } from "../data";
const boxService = {
  getBoxes: () => {
    return baseService.get(uris.BOXES);
  },
  saveBoxes: (box) => {
    return baseService.post(uris.BOXES, data);
  },
};
export default boxService;
