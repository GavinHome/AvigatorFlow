import { Vue, Component, Prop } from "vue-property-decorator";
import "./index.scss";

@Component
export default class Layout extends Vue {
  @Prop({ default: 8, type: Number }) readonly left!: number;
  @Prop({ default: 8, type: Number }) readonly middle!: number;
  @Prop({ default: 8, type: Number }) readonly right!: number;
  @Prop({ default: 8, type: Number }) readonly gutter!: number;

  render() {
    return (
      <div class={"layout"}>
        <a-row gutter={this.gutter}>
          <a-col span={this.left}>
            <div class={"left"}>{this.$slots["left"]}</div>
          </a-col>
          <a-col span={this.middle}>
            <div class={"middle"}>{this.$slots["middle"]}</div>
          </a-col>
          <a-col span={this.right}>
            <div class={"right"}>{this.$slots["right"]}</div>
          </a-col>
        </a-row>
      </div>
    );
  }
}
