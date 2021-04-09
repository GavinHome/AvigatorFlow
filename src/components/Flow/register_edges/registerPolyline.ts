import LogicFlow, { GraphModel } from "@logicflow/core";
import { EdgeNameTypeEnum } from "../common/model";

export default function registerPolyline(lf: LogicFlow): void {
  lf.register(
    EdgeNameTypeEnum.Polyline,
    ({ PolylineEdge, PolylineEdgeModel }) => {
      class ConnnectionModel extends PolylineEdgeModel {
        //eslint-disable-next-line
        constructor(data: any, graphModel: GraphModel) {
          super(data, graphModel);
        }
      }
      return {
        view: PolylineEdge,
        model: ConnnectionModel,
      };
    }
  );
}
