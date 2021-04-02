import LogicFlow, { GraphModel } from "@logicflow/core";
export default function registerTask(lf: LogicFlow): void {
  lf.register("task", ({ RectNode, RectNodeModel }) => {
    class TaskNode extends RectNode {}
    class TaskModel extends RectNodeModel {
      //eslint-disable-next-line
      constructor(data: any, graphModel: GraphModel) {
        super(data, graphModel);
      }
    }

    return {
      view: TaskNode,
      model: TaskModel,
    };
  });
}
