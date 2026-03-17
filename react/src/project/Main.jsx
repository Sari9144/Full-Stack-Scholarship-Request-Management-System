import { Provider } from "react-redux"
import store from "./redux/store"
// import { Show } from "./Show"
import { Routing } from "./Routing/Routing"
import { PersonalForm } from "./comps/PersonalForm"
import { CourseForm } from "./comps/CourseForm"
import { BankForm } from "./comps/BankForm"

export const Main=()=>{
    return<>
<Provider store={store}>
<Routing></Routing>
{/* <Show></Show> */}
</Provider>
{/* <BankForm>n</BankForm>
 <PersonalForm></PersonalForm>
 <CourseForm></CourseForm> */}
</>
}

