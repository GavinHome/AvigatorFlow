import { NodeNameConst, NodeTypeEnum } from "@/components/Flow/common/model";
import LogicFlow, { GraphModel } from "@logicflow/core";

export default function registerStart(lf: LogicFlow): void {
  lf.register(NodeTypeEnum.Start, ({ CircleNode, CircleNodeModel, h }) => {
    class StartNode extends CircleNode {
      getLabelShape() {
        const attributes = this.getAttributes();
        const { x, y } = attributes;
        return h(
          "text",
          {
            fill: "#000000",
            fontSize: 12,
            x: x - 12,
            y: y + 4,
            width: 50,
            height: 25,
          },
          ""
        );
      }
      getShape() {
        const attributes = this.getAttributes();
        const { x, y, r, fill, stroke, strokeWidth } = attributes;
        return h("g", {}, [
          h("circle", {
            cx: x,
            cy: y,
            r,
            fill,
            stroke,
            strokeWidth,
          }),
          this.getLabelShape(),
        ]);
      }
    }
    class StartModel extends CircleNodeModel {
      //eslint-disable-next-line
      constructor(data: any, graphModel: GraphModel) {
        data.text = {
          value: (data.text && data.text.value) || NodeNameConst.START,
          x: data.x,
          y: data.y,
          dragable: false,
          editable: false,
        };
        super(data, graphModel);
      }
      getConnectedTargetRules() {
        const rules = super.getConnectedTargetRules();
        const notAsTarget = {
          message: "起始节点不能作为连线的终点",
          validate: () => false,
        };
        rules.push(notAsTarget);
        return rules;
      }
    }
    return {
      view: StartNode,
      model: StartModel,
    };
  });
}
