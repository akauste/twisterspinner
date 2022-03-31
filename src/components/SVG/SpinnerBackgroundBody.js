const SpinnerBackgroundBody = () => {
  return(<g id="body-figure">
      <circle cx={0} cy={-40} r={10} fill='none' stroke="black" strokeWidth={1} />
      <line x1={0} y1={15} x2={0} y2={-30} stroke="black" strokeWidth={3} />
      <line x1={0} y1={-20} x2={-30} y2={-50} stroke="black" strokeWidth={3} />
      <line x1={0} y1={-20} x2={30} y2={-50} stroke="black" strokeWidth={3} />
      <line x1={0} y1={15} x2={30} y2={60} stroke="black" strokeWidth={3} />
      <line x1={0} y1={15} x2={-30} y2={60} stroke="black" strokeWidth={3} />
    </g>);
};
export default SpinnerBackgroundBody;