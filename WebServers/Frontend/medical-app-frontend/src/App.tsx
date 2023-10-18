import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.tsx";
import {useAppDispatch} from "./store/hooks.ts";
import {getTokenFromLocalStorage} from "./helpers/localstorage.helper.ts";
import {AuthApi} from "./api/auth.api.ts";
import {UserSlice} from "./store/slice/UserSlice.ts";
import {useEffect} from "react";
import {useTheme} from "./hooks/getTheme.ts";
import {ThemeProvider} from "@gravity-ui/uikit";

import "./styles/Loader.scss"
import "./styles/Toaster.scss"
import "./styles/const.scss"


function App() {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if(token){
        const data = await AuthApi.getUser()
        if(data){
          data.token = token
          dispatch(UserSlice.actions.login(data))
        }
        else {
          dispatch(UserSlice.actions.logout())
        }
      }
    }
    catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    checkAuth()
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
  )
}

export default App
