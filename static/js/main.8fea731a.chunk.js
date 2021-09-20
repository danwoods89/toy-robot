(this["webpackJsonptoy-robot"]=this["webpackJsonptoy-robot"]||[]).push([[0],{26:function(e,t,o){"use strict";o.r(t);var r,n=o(1),a=o.n(n),i=o(12),c=o.n(i),s=o(3),b=o(4),d=o(16),l=o(7),O=o(0);!function(e){e.NORTH="NORTH",e.SOUTH="SOUTH",e.EAST="EAST",e.WEST="WEST"}(r||(r={}));var u,j=[r.EAST,r.NORTH,r.WEST,r.SOUTH],m={validateCommand:function(e){var t,o,r,n;return!!((null===(t=e.coordinates)||void 0===t?void 0:t.x)<=6&&(null===(o=e.coordinates)||void 0===o?void 0:o.y)<=6&&(null===(r=e.coordinates)||void 0===r?void 0:r.x)>=0&&(null===(n=e.coordinates)||void 0===n?void 0:n.y)>=0&&e.exists)},isNumber:function(e){return null!=e&&""!==e&&!Number.isNaN(Number(e.toString()))}};!function(e){e.MOVE="MOVE",e.PLACE="PLACE",e.LEFT="LEFT",e.RIGHT="RIGHT",e.REPORT="REPORT",e.RESET="RESET"}(u||(u={}));var p,v,y,E,x,f,g={robot:{orientation:r.NORTH,coordinates:{x:0,y:0},exists:!1},error:!1,message:""},h=function(e,t){switch(t.type){case u.MOVE:switch(e.robot.orientation){case r.NORTH:var o=Object(O.a)(Object(O.a)({},e.robot.coordinates),{},{y:e.robot.coordinates.y+1}),n=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:o});return m.validateCommand(n)?{robot:n,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid move - outside y axis boundary."});case r.SOUTH:var a=Object(O.a)(Object(O.a)({},e.robot.coordinates),{},{y:e.robot.coordinates.y-1}),i=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:a});return m.validateCommand(i)?{robot:i,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid move - outside y axis boundary."});case r.EAST:var c=Object(O.a)(Object(O.a)({},e.robot.coordinates),{},{x:e.robot.coordinates.x+1}),s=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:c});return m.validateCommand(s)?{robot:s,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid move - outside x axis boundary."});case r.WEST:var b=Object(O.a)(Object(O.a)({},e.robot.coordinates),{},{x:e.robot.coordinates.x-1}),d=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:b});return m.validateCommand(d)?{robot:d,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid move - outside x axis boundary."});default:throw new Error("Invalid direction.")}case u.PLACE:if(e.robot.exists){var l=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:t.payload.coordinates});return m.validateCommand(l)?{robot:l,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid robot placement. Robot must be placed within the boundaries."})}if(t.payload.orientation){var p=Object(O.a)(Object(O.a)({},e.robot),{},{coordinates:t.payload.coordinates,orientation:t.payload.orientation,exists:!0});return m.validateCommand(p)?{robot:p,error:!1,message:""}:Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"Invalid robot placement. Robot must be placed within the boundaries."})}return Object(O.a)(Object(O.a)({},e),{},{error:!0,message:"An orientation must be provided for first placements."});case u.LEFT:return Object(O.a)(Object(O.a)({},e),{},{robot:Object(O.a)(Object(O.a)({},e.robot),{},{orientation:j[(j.indexOf(e.robot.orientation)+1)%j.length]})});case u.RIGHT:return Object(O.a)(Object(O.a)({},e),{},{robot:Object(O.a)(Object(O.a)({},e.robot),{},{orientation:j[(j.indexOf(e.robot.orientation)+j.length-1)%j.length]})});case u.REPORT:return e;case u.RESET:return Object(O.a)(Object(O.a)({},e),{},{error:!1,message:""});default:throw new Error("Unspecified action type.")}},T=o(2),R=b.a.div(p||(p=Object(s.a)(["\n  background-color: rgba(66, 66, 66, 0.7);\n  width: 100%;\n  max-width: 400px;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"]))),S=b.a.textarea(v||(v=Object(s.a)(["\n  display: block;\n  width: 100%;\n  height: 10em;\n  background-color: rgba(75, 75, 90, 0.7);\n  resize: none;\n  margin-bottom: 1em;\n  border-radius: 10px;\n  padding: 15px 15px;\n  outline: none;\n  border: none;\n  color: white;\n"]))),w=b.a.input(y||(y=Object(s.a)(["\n  display: block;\n  width: 100%;\n  background-color: rgba(75, 75, 90, 0.7);\n  color: white;\n  border-radius: 10px;\n  padding: 0 15px;\n  height: 30px;\n  outline: none;\n  border: none;\n"]))),C=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),o=t[0],r=t[1],a=Object(n.useState)(),i=Object(l.a)(a,2),c=i[0],s=i[1],b=Object(n.useReducer)(h,g),O=Object(l.a)(b,2),j=O[0],m=O[1],p=Object(n.useRef)(null),v=Object(n.useCallback)((function(e){var t=Object(d.a)(o);t.push(e),r(t),s("")}),[o]);Object(n.useEffect)((function(){p&&p.current&&(p.current.scrollTop=p.current.scrollHeight)}),[o]),Object(n.useEffect)((function(){return j.error&&v(j.message),function(){m({type:u.RESET})}}),[v,j.error,j.message]);return Object(T.jsxs)(R,{children:[Object(T.jsx)(S,{value:o.join("\n"),readOnly:!0,ref:p}),Object(T.jsx)(w,{type:"text",value:c||"",onChange:function(e){s(e.currentTarget.value)},onKeyDown:function(e){"Enter"===e.key&&c&&(v(c),function(e){var t=e.trim().split(/(\s+)/);try{switch(t[0]){case u.PLACE:if(e.match(/PLACE \d,\d,NORTH|SOUTH|EAST|WEST/)){var o=t[2].split(","),r=parseFloat(o[0]),n=parseFloat(o[1]),a=o[2];m({type:u.PLACE,payload:{coordinates:{x:r,y:n},orientation:a}})}else{if(!e.match(/PLACE \d,\d/)||!j.robot.exists)throw Error("PLACE commmand format incorrect.");var i=t[2].split(","),c=parseFloat(i[0]),s=parseFloat(i[1]);m({type:u.PLACE,payload:{coordinates:{x:c,y:s},orientation:null}})}break;case u.MOVE:m({type:u.MOVE});break;case u.LEFT:m({type:u.LEFT});break;case u.RIGHT:m({type:u.RIGHT});break;case u.REPORT:m({type:u.REPORT}),j.robot.exists?v("REPORT: ".concat(j.robot.coordinates.x,",").concat(j.robot.coordinates.y,",").concat(j.robot.orientation)):v("No robot deployed!");break;default:v("Invalid command.")}}catch(b){v(b)}}(c))},placeholder:"Input a command and press enter"})]})},k=b.a.div(E||(E=Object(s.a)(["\n  position: relative;\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: hsla(0, 0%, 100%, 0.87);\n  text-rendering: optimizeLegibility;\n  font-family: 'Montserrat', sans-serif;\n"]))),H=b.a.h1(x||(x=Object(s.a)(["\n  display: block;\n  font-weight: 600;\n  font-size: 10vmin;\n  margin: 0;\n  color: rgb(222, 228, 253);\n"]))),A=b.a.h5(f||(f=Object(s.a)(["\n  display: block;\n  font-weight: 200;\n  font-size: 2vmin;\n"]))),I=function(){return Object(T.jsxs)(k,{children:[Object(T.jsx)(H,{children:"toy-robot"}),Object(T.jsx)(A,{children:"Dan Woods"}),Object(T.jsx)(C,{})]})};c.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(I,{})}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.8fea731a.chunk.js.map