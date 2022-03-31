const SpinnerBackground = () => {
  const spots = [];
  const color = ['red', 'green', 'blue', 'yellow', 'transparent'];
  for(let i=0; i < 20; i++) {
    const rads = 2*Math.PI/20*(i+0.5);
    spots.push(
      <circle 
        key={`dot-${i}`}
        cx={Math.sin(rads)*85} 
        cy={-Math.cos(rads)*85} 
        r={12} 
        fill={color[ i % 5 ]}
        stroke={'#333'}
        strokeWidth={1}
      />);
  }

  return (<g id="background">
    <circle cx={0} cy={0} r={95} fill={'silver'}  stroke={'gray'} strokeWidth={5} />
    <circle cx={0} cy={0} r={10} fill={'gray'}  stroke={'gray'} strokeWidth={2} />
    <line x={0} y1={-98} y2={98} stroke="white" strokeWidth={0.5}></line>
    <line y={0} x1={-98} x2={98} stroke="white" strokeWidth={0.5}></line>
    { spots.map(s => s) }
  </g>);
};

export default SpinnerBackground;