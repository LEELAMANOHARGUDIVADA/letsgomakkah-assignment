import { ActiveComponentProvider } from "./context/ActiveComponentContext";
import Routers from "./routes/Routers";

export default function App(){
  return(
    <ActiveComponentProvider>
      <Routers />
    </ActiveComponentProvider>
  )
}