import styled from "@emotion/styled";

const NavStyled = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const NavDotStyled = styled.span`
  width: 8rem;
  height: 0.5rem;
  border-radius: 40px;
  background-color: black;
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  cursor: pointer;

  opacity: 0.4;

  ${(props) => {
    if (props.active)
      return `
    background-color: #4fd1c5;
    opacity: 1;
    `;
  }}
`;

const Nav = (props) => {
  const dots = [];

  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;

    dots.push(
      <NavDotStyled
        key={`nav-dot-${i}`}
        active={isActive}
        onClick={() => props.goToStep(i)}
      />
    );
  }

  return <NavStyled>{dots}</NavStyled>;
};

export { Nav as default };
