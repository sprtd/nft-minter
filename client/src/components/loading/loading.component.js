
import { LoadingWrapper } from "./loading.style";
import BarLoader from "react-spinners/BarLoader"



const Loading = () => {

  return (
    <LoadingWrapper>
      <BarLoader color='purple' height={10} /> 
    </LoadingWrapper>
  )
}

export default Loading

