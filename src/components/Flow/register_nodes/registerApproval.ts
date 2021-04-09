import { NodeNameConst, NodeTypeEnum } from "@/components/Flow/common/model";
import LogicFlow, { GraphModel } from "@logicflow/core";
import { RectangleNodeConst } from "../common/const";

export default function registerUser(lf: LogicFlow): void {
  lf.register(NodeTypeEnum.Approval, ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getShape() {
        const attributes = this.getAttributes();
        const { width, height, x, y, fill, strokeWidth, stroke } = attributes;
        const attrs = {
          x: x - width / 2,
          y: y - height / 2,
          width: RectangleNodeConst.width,
          height: RectangleNodeConst.height,
          stroke,
          fill,
          strokeWidth,
          rx: RectangleNodeConst.radius,
          ry: RectangleNodeConst.radius,
        };
        return h("g", {}, [
          h("rect", { ...attrs }),
          h(
            "svg",
            {
              x: x - width / 2 + 5,
              y: y - height / 2 + 5,
              width: RectangleNodeConst.icon_width,
              height: RectangleNodeConst.icon_height,
              viewBox: "0 0 1274 1024",
            },
            h("path", {
              fill: stroke,
              d:
                "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z",
            })
          ),
        ]);
      }
    }
    class Model extends PolygonNodeModel {
      //eslint-disable-next-line
      constructor(data: any, graphModel: GraphModel) {
        data.text = {
          value: (data.text && data.text.value) || NodeNameConst.APPROVAL,
          x: data.x,
          y: data.y + RectangleNodeConst.text_offsetY,
        };
        super(data, graphModel);
        const lenght = RectangleNodeConst.width / 2;
        const height = RectangleNodeConst.height / 2;
        this.points = [
          [lenght, 0],
          [lenght * 2, height],
          [lenght, height * 2],
          [0, height],
        ];
      }
    }
    return {
      view: Node,
      model: Model,
    };
  });
}
