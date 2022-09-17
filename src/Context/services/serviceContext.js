import { createContext } from "react";


// here we are using the create context hook of the react so that we my create a context and use it whwnever we require it
// by simply calling use context hook and also we require a state to be passe in the context hook so that may recieve it whenever require it.

const ServiceContext = createContext();


export default ServiceContext;