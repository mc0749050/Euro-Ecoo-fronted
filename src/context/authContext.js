import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [userdata, setuserdata] = useState(null);
    const [auth, setauth] = useState({
        user: null,
        token: ''
    })

    // for loading page 
    const [loading, setloading] = useState(auth);

    // for get userdata from api 
    const fetchData = async () => {
            
        if (auth && auth.user && auth.user.email) {  // Check if auth exists
            try {
                const res = await axios.get(`${process.env.REACT_APP_LIVE_URL}/get-user-data?email=${auth.user.email}`);
                if (res && res.data) {
                    setuserdata(res.data.userdata);
                    setloading(false)
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                setloading(false);    
            }
        }
        else{
                setuserdata(null); 
                setloading(false);    
        }
    };

    
    useEffect(() => {
        fetchData();
        
    }, [auth]);  // Add auth as a dependency
    
    
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data)
            setauth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })

            console.log(auth)
        }
    },[])




    return(
    <AuthContext.Provider value={{auth, setauth, userdata, setuserdata, loading, setloading, fetchData}}>
        {children}
    </AuthContext.Provider>
    );
}

export default AuthProvider;