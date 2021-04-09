import { Definition } from "@logicflow/core";

export const flowConfig = (
  container: HTMLElement,
  isSilentMode: boolean
): Definition => {
  return {
    textEdit: false,
    isSilentMode: isSilentMode,
    container: container,
    background: {
      color: "#f7f9ff",
    },
    style: {
      rect: {
        strokeWidth: 1,
      },
      circle: {
        r: 20,
        strokeWidth: 1,
      },
      ellipse: {
        strokeWidth: 1,
      },
      diamond: {
        strokeWidth: 1,
      },
      polygon: {
        strokeWidth: 1,
      },
      anchor: {
        strokeWidth: 1,
      },
      line: {
        strokeWidth: 1,
      },
      polyline: {
        strokeWidth: 1,
      },
    },
    grid: {
      size: 10,
      visible: false,
    },
    keyboard: {
      enabled: true,
    },
    hoverOutline: true,
    // edgeTextDraggable: true,
    guards: {
      // eslint-disable-next-line
      beforeClone(data: any) {
        //允许克隆返回true,不允许返回false
        return true;
      },
      // eslint-disable-next-line
      beforeDelete(data: any) {
        //允许删除返回true,不允许返回false
        return true;
      },
    },
  };
};
