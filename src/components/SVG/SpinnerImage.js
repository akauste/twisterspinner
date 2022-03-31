import { useEffect, useRef, useState } from "react";
import SpinnerBackground from "./SpinnerBackground";
import SpinnerBackgroundBody from "./SpinnerBackgroundBody";

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

  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" style={{width: 200, height: 200}}>
    <SpinnerBackground />
    <SpinnerBackgroundBody />
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
