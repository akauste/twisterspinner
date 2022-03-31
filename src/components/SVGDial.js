import { useEffect, useRef, useState } from "react";

const SVGDial = (props) => {
  let {position} = props;
  // Direction of the dial
  const dirX = Math.sin(0);
  const dirY = -Math.cos(0);

  const endDial = useRef();
  const startAnimateRef = useRef();
  const [dial, setDial] = useState();
  
  useEffect(() => {
    if(endDial.current !== undefined) {
      // We have previous value
      const start = endDial.current;
      endDial.current = 360/20*(position+0.5);
      setDial(prev => ({
        round: ( prev ? prev.round + 1 : 1),
        now: new Date(),
        start: start,
        resetTime: (360-start)/360,
        endTime: 1-(360-endDial.current)/360 
      }));
      if(startAnimateRef.current) {
        startAnimateRef.current.beginElement();
      }
    }
    else {
      endDial.current = 0;
    }
  }, [position]);

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
    <g id="background">
      <circle cx={0} cy={0} r={95} fill={'silver'}  stroke={'gray'} strokeWidth={5} />
      <circle cx={0} cy={0} r={10} fill={'gray'}  stroke={'gray'} strokeWidth={2} />
      <line x={0} y1={-98} y2={98} stroke="white" strokeWidth={0.5}></line>
      <line y={0} x1={-98} x2={98} stroke="white" strokeWidth={0.5}></line>
      { spots.map(s => s) }
    </g>
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
      { dial && <animateTransform ref={startAnimateRef} id={`reset${dial.round}`} attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from={`${dial.start} 0 0`}
                          to="360 0 0"
                          dur={`${dial.resetTime}s`}
                          />}
      { dial && <animateTransform id={`fullround${dial.round}`} attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 0 0"
                          to="360 0 0"
                          begin={`reset${dial.round}.end`}
                          dur="1s"
                          repeatCount="1"/>}
      { dial && <animateTransform id={`finish${dial.round}`} attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 0 0"
                          to={`${endDial.current} 0 0`}
                          begin={`fullround${dial.round}.end`}
                          dur={`${dial.endTime}s`}
                          fill="freeze"
                           />}
    </g>
  </svg>);
};
export default SVGDial;
