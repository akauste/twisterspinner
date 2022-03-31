const SVGDial = (props) => {
  let {position} = props;
  let dirX, dirY; // Direction of the dial
  if(position !== undefined) {
    dirX = Math.sin(2*Math.PI/20*(position + 0.5));
    dirY = -Math.cos(2*Math.PI/20*(position + 0.5));
  }
  else {
    dirX = Math.sin(0);
    dirY = -Math.cos(0);
  }

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

  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" style={{width: 200, height: 200}}>
    <circle cx={0} cy={0} r={95} fill={'silver'}  stroke={'gray'} strokeWidth={5} />
    <circle cx={0} cy={0} r={10} fill={'gray'}  stroke={'gray'} strokeWidth={2} />
    <line x={0} y1={-98} y2={98} stroke="white" strokeWidth={0.5}></line>
    <line y={0} x1={-98} x2={98} stroke="white" strokeWidth={0.5}></line>
    { spots.map(s => s) }
    <g id="body-figure">
      <circle cx={0} cy={-40} r={10} fill='none' stroke="black" strokeWidth={1} />
      <line x1={0} y1={15} x2={0} y2={-30} stroke="black" strokeWidth={3} />
      <line x1={0} y1={-20} x2={-30} y2={-50} stroke="black" strokeWidth={3} />
      <line x1={0} y1={-20} x2={30} y2={-50} stroke="black" strokeWidth={3} />
      <line x1={0} y1={15} x2={30} y2={60} stroke="black" strokeWidth={3} />
      <line x1={0} y1={15} x2={-30} y2={60} stroke="black" strokeWidth={3} />
    </g>
    <g id="dial">
      <line x1={0} y1={0} x2={dirX*90} y2={dirY*90} stroke='darkred' strokeWidth={8} />
      <circle cx={0} cy={0} r={4} fill='darkred' strokeWidth={0} />
      <circle cx={dirX*90} cy={dirY*90} r={4} fill='darkred' strokeWidth={0} />
    </g>
  </svg>);
};
export default SVGDial;
