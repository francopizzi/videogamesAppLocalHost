
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CardVideogame from '../components/CardVideogame/CardVideogame';


configure({ adapter: new Adapter() });

describe("<CardVideogame />", () => {
    describe("Estructura", () => {
      let wrapper;
      beforeEach(() => {
      wrapper = shallow(<CardVideogame />);
      });
      it("Renderiza un <h1> para el nombre del juego", () => {
        expect(wrapper.find("h1")).toHaveLength(1);
      });
      it("Renderiza un <p>", () => {
        expect(wrapper.find("p")).toHaveLength(1);
      });
      it("Renderiza un <img> para la imagen del juego", () => {
        expect(wrapper.find("img")).toHaveLength(1);
      });
});
});
