import { TABLE_RESIZE } from './type';

// Action Creater
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  };
}
