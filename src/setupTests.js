import Enzyme from "enzyme";
import EnzymeAdaper from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdaper(),
  disableLifecycleMethods: true
});
