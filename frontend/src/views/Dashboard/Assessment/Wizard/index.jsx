import { Container } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StepWizard from "react-step-wizard";
import DisplayResults from "./DisplayResults";
import CalculationFeedback from "./CalculationFeedback";
import CrashReaction from "./CrashReaction";
import Nav from "./Nav";
import ValueToInvest from "./ValueToInvest";
import Goals from "./Goals";

const StepWizardStyled = styled(StepWizard)`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled(Container)`
  cursor: pointer;
  &:hover {
    background-color: #4fd1c5;
    transform: translateY(-5px);
    height: 120%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
  ${(props) => {
    if (props.active)
      return `
      background-color: #4fd1c5;
      transform: translateY(-5px);
      height: 120%;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      `;
  }}
`;

export {
  StepWizardStyled,
  Card,
  DisplayResults,
  CalculationFeedback,
  CrashReaction,
  Nav,
  ValueToInvest,
  Goals,
};
