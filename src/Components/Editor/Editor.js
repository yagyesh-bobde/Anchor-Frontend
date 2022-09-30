import React from "react";
import JoditEditor from "jodit-react";



const ReactEditor = ({ readOnly=true,content,setContent }) => {

  const editor = React.useRef(null)

  return (
  
    <>

       <JoditEditor  ref={editor} onChange={(e) => {setContent(e)}} value={content} /> 
       
    </>
    );
  
}


export default ReactEditor;
